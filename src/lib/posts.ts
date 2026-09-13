import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type Category = Post['data']['category'];

export const CATEGORIES = {
	product: {
		heading: 'Product',
		blurb: '제품을 뜯어보고, 고치고, 그 과정과 생각들을 남깁니다.',
	},
	think: {
		heading: 'Think',
		blurb: '진지하고 가끔은 가볍고, 그때그때 다른 생각들.',
	},
} as const satisfies Record<Category, { heading: string; blurb: string }>;

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as Category[];

export const href = (post: Post) => `/${post.data.category}/${post.id}/`;

/** Leading digits of the filename, shown as the series index. */
export const seriesNo = (post: Post) => post.id.match(/^\d+/)?.[0] ?? null;

const byDateDesc = (a: Post, b: Post) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

export async function getPosts(category?: Category) {
	const posts = await getCollection('posts');
	return posts.filter((p) => !category || p.data.category === category).sort(byDateDesc);
}

/** "Start here" entry points, in reading order rather than by recency. */
export async function getFeatured() {
	return (await getPosts()).filter((p) => p.data.featured).sort((a, b) => a.id.localeCompare(b.id));
}

/** A series reads in its authored order, which the filename prefix encodes. */
const inReadingOrder = (posts: Post[]) => [...posts].sort((a, b) => a.id.localeCompare(b.id));

/**
 * The post's whole series plus its place in it — enough for both the
 * prev/next links and the table of contents.
 */
export async function getSeriesContext(post: Post) {
	if (!post.data.series) return {};
	const seriesPosts = inReadingOrder(
		(await getCollection('posts')).filter((p) => p.data.series === post.data.series),
	);
	const i = seriesPosts.findIndex((p) => p.id === post.id);
	return {
		seriesPosts,
		prev: seriesPosts[i - 1],
		next: seriesPosts[i + 1],
		position: i + 1,
		length: seriesPosts.length,
	};
}

export type Series = {
	name: string;
	posts: Post[];
	/** Newest publish date in the series, which is what "recently updated" means here. */
	updated: Date;
};

/** Series in a category, most recently updated first. */
export async function getSeriesList(category?: Category): Promise<Series[]> {
	const grouped = new Map<string, Post[]>();
	for (const post of await getPosts(category)) {
		const { series } = post.data;
		if (!series) continue;
		grouped.set(series, [...(grouped.get(series) ?? []), post]);
	}
	return [...grouped]
		.map(([name, posts]) => ({
			name,
			posts: inReadingOrder(posts),
			updated: posts.reduce(
				(max, p) => (p.data.pubDate > max ? p.data.pubDate : max),
				posts[0].data.pubDate,
			),
		}))
		.sort((a, b) => b.updated.valueOf() - a.updated.valueOf());
}
