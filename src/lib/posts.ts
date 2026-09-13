import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type Category = Post['data']['category'];

export const CATEGORIES = {
	product: {
		heading: 'Product',
		blurb: '제품을 뜯어보고, 고치고, 그 과정을 남깁니다.',
	},
	think: {
		heading: 'Think',
		blurb: '제품을 만들며 생각한 것들. 방법론과 그 언저리.',
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

/**
 * Neighbours within the post's series, ordered by filename so the series reads
 * in its authored order rather than by publish date.
 */
export async function getSeriesNeighbours(post: Post) {
	if (!post.data.series) return {};
	const series = (await getCollection('posts'))
		.filter((p) => p.data.series === post.data.series)
		.sort((a, b) => a.id.localeCompare(b.id));
	const i = series.findIndex((p) => p.id === post.id);
	return {
		prev: series[i - 1],
		next: series[i + 1],
		position: i + 1,
		length: series.length,
	};
}
