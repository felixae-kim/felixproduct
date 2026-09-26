---
title: '7편. REDESIGN: 사람이 필요한 자리를 먼저 적는다'
description: '역할을 재배치할 때 AI가 맡을 곳보다 사람이 필요한 곳을 먼저 적는 편이 안전합니다. 다섯 가지 조건 중 하나라도 걸리면 그 단계는 사람의 확인을 거치게 둡니다.'
pubDate: '2026-09-26'
category: 'product'
series: 'AX 워크플로우 설계 : AI는 기능이 아니라 역할이다'
---

이제 역할을 배치할 차례입니다. 세 주체가 잘하는 일이 다릅니다.

**System.** 결과가 결정적이고 규칙이 명확한 실행에 강합니다. DB 조회, 데이터 저장, 메시지 발송, 결제 취소 API 호출이 여기 해당합니다. Rule이 명확하고 시스템이 안정적으로 처리할 수 있다면 굳이 AI에게 맡기지 않아도 됩니다.

**AI.** 비정형 정보를 읽고 분류하거나 요약하거나 추론하는 작업에 강합니다. 특히 사람이 텍스트와 문서와 여러 맥락 정보를 보고 내리던 Judgment를 보조하는 데 쓸 수 있습니다.

**Human.** 책임, 애매함, 고위험 판단이 필요한 영역에 배치합니다. 큰 금액의 승인, AI가 확신하지 못하는 예외, 고객에게 법적 영향을 미치는 최종 결정이 여기 해당합니다.

그래서 좋은 AX Workflow는 AI가 사람을 전부 대체하는 구조가 아니라, System이 실행하고 AI가 비정형 판단을 담당하거나 보조하며 Human이 중요한 판단과 예외를 통제하는 구조가 될 가능성이 높습니다.

## 사람이 여전히 필요한 자리를 먼저 적는다

역할을 재배치할 때는 AI가 맡을 곳보다 사람이 필요한 곳을 먼저 적는 편이 안전합니다. 아래 조건 중 하나라도 걸리면 그 단계는 사람의 확인을 거치게 둡니다.

- 되돌리기 어려운 Action일 때 (판매중단, 결제 취소, 외부 발송)
- 틀렸을 때 고객이나 사업에 큰 손실이 생길 때
- AI 판단이 애매하거나 입력 정보가 부족할 때
- 전문가가 정의한 예외에 해당할 때
- 판단 기준 자체를 고치는 일일 때

이 다섯 가지의 밑바탕에는 같은 사실이 하나 있습니다. AI는 결과에 책임지지 않습니다. 잘못된 판단으로 매출이 빠지거나 고객이 이탈하면 그 피해는 회사가 떠안고, 셀러에게 사과하고 기준을 고치는 것도 사람입니다. 그래서 책임을 물어야 하는 자리에는 사람이 있어야 합니다.

이 조건을 먼저 적어두면 자동화 수준을 감으로 정하지 않게 됩니다. AI 성능만 보고 자동화 범위를 늘리면 오류 비용이 큰 지점까지 함께 넘어갑니다.

물론 실제 배치는 업무마다 다릅니다. 이건 원칙이지 정답표가 아닙니다. 어떤 업무에서는 AI가 초안만 만들고 사람이 대부분을 결정할 수 있고, 다른 업무에서는 AI가 판단한 뒤 시스템이 자동 실행할 수도 있습니다. 중요한 건 각 역할을 왜 그렇게 배치했는지 설명할 수 있어야 한다는 점입니다.

## Case Study. REDESIGN

상품정보 변경이 발생하면 System이 변경 전후 값과 로그를 남깁니다. 카테고리처럼 정형 Rule로 통제할 수 있는 필드는 AI 없이 시스템 로직으로 처리합니다. 상품명처럼 비정형 판단이 필요한 변경은 AI가 변경 전후의 뜻을 읽고, 전문가가 정한 정책에 따라 심각 / 중간 / 정상으로 분류합니다.

<div style="overflow-x:auto;margin:1.5rem 0"><svg viewBox="0 0 680 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TO-BE 흐름도. 변경 시점에 정형은 Rule로, 비정형은 AI가 판정하고 심각·중간·정상 세 갈래로 나뉜다. 사람은 네 곳에 들어온다." style="width:100%;min-width:660px;height:auto;display:block"><defs><marker id="b1" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L6,4 L0,7" fill="none" stroke="#8b949e" stroke-width="1.2"/></marker><marker id="b2" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L6,4 L0,7" fill="none" stroke="#d29922" stroke-width="1.2"/></marker></defs><style>.r{font:600 10.5px var(--font-mono);letter-spacing:.04em}.t{font:400 13px var(--font-sans);fill:#c9d1d9}.n{font:400 11px var(--font-sans);fill:#8b949e}.g{font:600 12px var(--font-mono)}.sysr{fill:#8b949e}.humr{fill:#d29922}.selr{fill:#3fb950}.air{fill:#58a6ff}.box{fill:#161b22;stroke:#262c36}.hbox{fill:#1c222b;stroke:#3a2f14}.abox{fill:#11212f;stroke:#1f4d78}</style><text x="20" y="14" class="r" fill="#e6edf3">TO-BE</text><text x="88" y="14" class="n">정형은 Rule, 비정형은 AI, 비용 큰 판단은 사람</text><rect x="20" y="26" width="205" height="38" rx="6" class="box"/><text x="32" y="42" class="r selr">SELLER</text><text x="32" y="57" class="t">상품정보 변경</text><line x1="122" y1="64" x2="122" y2="80" stroke="#8b949e" stroke-width="1.2" marker-end="url(#b1)"/><rect x="20" y="84" width="330" height="38" rx="6" class="box"/><text x="32" y="100" class="r sysr">SYSTEM</text><text x="32" y="115" class="t">변경 전후 값·로그 적재 · 정형 필드는 Rule로 확인</text><line x1="122" y1="122" x2="122" y2="138" stroke="#8b949e" stroke-width="1.2" marker-end="url(#b1)"/><rect x="20" y="142" width="330" height="42" rx="6" class="abox"/><text x="32" y="159" class="r air">AI</text><text x="32" y="175" class="t">상품명의 뜻을 읽고 위험도 판정</text><text x="362" y="158" class="n">판단이 고객 노출</text><text x="362" y="172" class="n">앞으로 올라왔다</text><line x1="122" y1="184" x2="122" y2="198" stroke="#8b949e" stroke-width="1.2"/><line x1="122" y1="198" x2="572" y2="198" stroke="#8b949e" stroke-width="1.2"/><line x1="122" y1="198" x2="122" y2="216" stroke="#8b949e" stroke-width="1.2" marker-end="url(#b1)"/><line x1="347" y1="198" x2="347" y2="216" stroke="#8b949e" stroke-width="1.2" marker-end="url(#b1)"/><line x1="572" y1="198" x2="572" y2="216" stroke="#8b949e" stroke-width="1.2" marker-end="url(#b1)"/><text x="20" y="232" class="g" fill="#f85149">심각</text><text x="245" y="232" class="g" fill="#d29922">중간</text><text x="470" y="232" class="g" fill="#3fb950">정상</text><rect x="20" y="240" width="205" height="34" rx="6" class="box"/><text x="32" y="261" class="t">중요 셀러·상품인가?</text><path d="M34,274 L34,379" fill="none" stroke="#8b949e" stroke-width="1.2"/><line x1="34" y1="317" x2="44" y2="317" stroke="#8b949e" stroke-width="1.2" marker-end="url(#b1)"/><text x="52" y="294" class="n">아니오</text><rect x="52" y="298" width="173" height="38" rx="6" class="box"/><text x="64" y="314" class="r sysr">SYSTEM</text><text x="64" y="329" class="t">즉시 자동조치 · 원복</text><line x1="34" y1="379" x2="44" y2="379" stroke="#8b949e" stroke-width="1.2" marker-end="url(#b1)"/><text x="52" y="356" class="n">예</text><rect x="52" y="360" width="173" height="52" rx="6" class="hbox"/><text x="64" y="376" class="r humr">HUMAN</text><text x="64" y="391" class="t">셀러와 협의</text><text x="64" y="403" class="n">미이행 시 판매중단</text><rect x="245" y="240" width="205" height="56" rx="6" class="hbox"/><text x="257" y="256" class="r humr">HUMAN</text><text x="257" y="271" class="t">담당자 검토</text><text x="257" y="287" class="n">문제 있으면 심각 경로로</text><rect x="470" y="240" width="205" height="38" rx="6" class="box"/><text x="482" y="256" class="r sysr">SYSTEM</text><text x="482" y="271" class="t">월별 시트 자동 취합</text><line x1="520" y1="278" x2="520" y2="294" stroke="#8b949e" stroke-width="1.2" marker-end="url(#b1)"/><rect x="470" y="298" width="205" height="38" rx="6" class="hbox"/><text x="482" y="314" class="r humr">HUMAN</text><text x="482" y="329" class="t">월 1회 전수 검수</text><line x1="520" y1="336" x2="520" y2="352" stroke="#8b949e" stroke-width="1.2" marker-end="url(#b1)"/><rect x="470" y="356" width="205" height="38" rx="6" class="hbox"/><text x="482" y="372" class="r humr">HUMAN</text><text x="482" y="387" class="t">판단 기준 보정</text><path d="M572,394 L572,430 L8,430 L8,163 L18,163" fill="none" stroke="#d29922" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#b2)"/><text x="180" y="446" class="n" fill="#d29922">고친 기준을 다음 AI 검수에 다시 적용한다</text><line x1="20" y1="458" x2="675" y2="458" stroke="#262c36"/><text x="20" y="474" class="n">사람이 들어오는 곳 네 군데 — 중간 등급 · 중요 셀러 협의 · 복잡한 클레임 · 월 1회 검수</text></svg></div>

3편에서 판단이 전부 고객 노출 뒤에 있었던 걸 기억하실 겁니다. 이제 판단이 변경 시점으로 올라왔습니다.

**심각**은 판매중단과 상품명 원복입니다. 다만 실행 전에 중요 셀러·상품인지 한 번 더 봅니다. 일반 대상이면 System이 즉시 자동조치합니다. 중요 셀러·상품이면 자동조치를 멈추고 담당자에게 변경 내용과 판단 근거를 보냅니다.

이 분기를 왜 두었는지는 설명이 필요합니다. 오판 비용 때문만은 아닙니다.

플랫폼이 정책을 만든다고 해서 셀러가 그대로 따르지는 않습니다. 커머스는 셀러를 두고 플랫폼끼리 경쟁하는 시장이고, 거래 비중이 큰 셀러일수록 다른 선택지가 많습니다. 우리가 옳다고 믿는 기준을 그대로 집행하면 그 셀러는 정책을 지키는 대신 다른 곳으로 갑니다. 누군가를 움직이게 하려면 힘이 필요한데, 그 힘의 크기는 상대에 따라 다릅니다. 갑과 을이 고정되어 있지 않은 시장입니다.

그래서 여기서 갈리는 건 위험도가 아니라 관계입니다. 같은 심각 판정이라도 일반 셀러에게는 시스템이 바로 조치하고, 거래 비중이 큰 셀러에게는 사람이 협의로 들어갑니다. 판정은 같고 집행 방식만 다릅니다. 원칙을 굽히는 게 아니라, 원칙이 실제로 지켜지게 만드는 경로를 하나 더 두는 겁니다.

중요 셀러·상품은 담당자가 셀러와 직접 협의합니다. 원복을 요청하고, 이행하지 않으면 판매가 중단된다는 점을 안내합니다. 셀러가 원복하면 담당자가 확인하고 판매를 유지하며 조치 기록을 남깁니다. 이때도 심각 판정 자체는 그대로 둡니다. 정상으로 재분류하지 않습니다. 원복하지 않으면 판매중단과 원복을 실행합니다.

**중간**은 담당자에게 알리고 사람이 검토합니다. 문제가 확인되면 심각과 같은 경로로 보내고, 문제가 없으면 아래의 정상 처리로 합류시킵니다.

**정상**은 즉시 조치하지 않습니다. 매월 새 시트가 자동 생성되어 담당자에게 전달되고, 담당자가 월 1회 모아둔 건을 전수 검수합니다. 여기서 오판이나 예외를 발견하면 판단 기준을 고치고, 고친 기준을 다음 AI 검수에 다시 적용합니다. 이 피드백이 돌아야 기준이 굳지 않고 계속 정확해집니다.

그리고 여기서 끝이 아닙니다. 판매가 중단되면 셀러는 정책을 모른 채 문의나 클레임을 겁니다. 이 문의도 AI가 성격을 분류합니다. 단순 정책 문의는 AI가 설명하는 답변을 바로 보내고, 강하거나 복잡한 클레임만 담당자에게 넘겨 직접 대응하게 했습니다.

정리하면 이 Workflow에서 사람이 들어오는 자리는 네 곳입니다.

1. 중간 등급 판정 건
2. 중요 셀러·상품의 심각 판정 건
3. 강하거나 복잡한 셀러 클레임
4. 월 1회 정상 건 전수 검수

나머지는 AI 판단과 System 실행으로 흘러갑니다. 4편에서 "사람이 필요한 자리"로 적어둔 다섯 곳이 여기 그대로 들어와 있습니다.

## 다음 편 예고

설계가 끝났습니다. 그런데 설계도는 아직 시스템이 아닙니다. 마지막 편에서는 이 설계가 현실의 데이터와 권한과 운영 정책 안에서 실제로 돌아가는지 검토하고, 이 연재 전체를 한 문단으로 묶겠습니다.

한 줄로 남깁니다. 자동화 범위는 AI 성능이 아니라 오류 비용으로 정합니다.
