---
title: '3편. MAP: 지금 어떻게 돌아가는지 분해한다'
description: '"VOC를 분석해서 담당 부서에 전달한다"는 한 문장이 아니라 일곱 단계입니다. 분해하고 나면 어디가 실행이고 어디가 판단인지, 그리고 어떤 판단이 아예 빠져 있는지가 보입니다.'
pubDate: '2026-09-26'
category: 'product'
series: 'AX 워크플로우 설계 : AI는 기능이 아니라 역할이다'
---

MAP 단계에서는 업무를 구성요소로 설명할 수 있어야 합니다. 예를 들어 이런 업무가 있다고 해보겠습니다.

> "고객 VOC를 분석해서 담당 부서에 전달한다."

겉으로는 한 문장입니다. 그런데 실제로 분해하면 이렇게 됩니다.

| | |
|---|---|
| INPUT | 고객 VOC가 들어온다 |
| ACTION | 내용을 읽는다 |
| DECISION | 어떤 유형의 VOC인지 판단한다 |
| DECISION | 심각도를 판단한다 |
| DECISION | 담당 부서를 판단한다 |
| ACTION | 담당 부서로 전달한다 |
| OUTPUT | 담당자에게 분류된 VOC가 전달된다 |

이 정도로 분해하면 어디가 단순 실행이고 어디가 판단인지, 사람이 어디에 시간을 쓰고 있는지가 보이기 시작합니다.

## Rule, Judgment, Action

분해한 다음에는 각 단계의 성격을 한 번 더 구분합니다.

**Rule.** 명시적인 조건으로 결정할 수 있는 업무입니다. "결제금액이 100만원 이상이면 팀장 승인" 같은 경우입니다. 조건이 충분히 명확하고 예외를 관리할 수 있다면 굳이 AI에게 판단을 맡길 필요가 없습니다. 기존 시스템의 로직이 더 예측 가능하고 운영하기 쉬울 수 있습니다.

**Judgment.** 공식만으로 설명하기 어렵고 맥락과 경험을 바탕으로 판단하는 업무입니다. "이 VOC가 단순 불만인지 서비스 장애의 징후인지" 같은 판단입니다. 여러 정보를 함께 보고 해석해야 하거나 전문가가 경험적으로 판단해온 영역이라면, AI가 보조하거나 일부를 담당할 후보가 됩니다.

**Action.** 판단이 아니라 실행입니다. Slack 전송, DB 저장, 담당자 배정이 여기 해당합니다. 이미 시스템이 안정적으로 하고 있다면 시스템에 맡기는 편이 자연스럽습니다.

MAP은 프로세스 그림을 예쁘게 그리는 단계가 아닙니다. 어떤 판단이 존재하는가, **어떤 판단이 빠져 있는가**, 어떤 일은 단순 실행인가를 드러내는 단계입니다.

## Case Study. MAP

운영팀이 지금 수기로 검수하는 과정을 같은 방식으로 분해하면 이렇게 됩니다.

| | | |
|---|---|---|
| INPUT | 셀러가 상품정보 변경을 제출한다 | |
| ACTION | 변경 내용을 그대로 저장한다 | |
| | *이 자리에 '이 변경을 허용해도 되는가?' 판단이 없다* | |
| ACTION | 변경된 정보를 고객에게 노출한다 | |
| ACTION | 운영팀이 변경 목록을 열어 전후 값을 대조한다 | 사람 |
| DECISION | 정형 필드의 정합성이 맞는가? | Rule로 옮길 수 있음 |
| DECISION | 이 상품명 변경이 어뷰징인가? | Judgment · 비정형 |
| DECISION | 원복·판매중단까지 할 사안인가? | Judgment · 사업 리스크 |
| ACTION | 상품명 원복 / 판매중단을 실행한다 | 사람 |
| ACTION | 셀러의 문의·클레임에 응대한다 | 사람 |
| OUTPUT | 어뷰징 건이 정리되고 셀러에게 결과가 전달된다 | |

<div style="overflow-x:auto;margin:1.5rem 0"><svg viewBox="0 0 680 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AS-IS 흐름도. 변경이 저장되고 고객에게 노출된 뒤에야 사람이 전수로 검수하고 판단한다." style="width:100%;min-width:600px;height:auto;display:block"><defs><marker id="a1" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L6,4 L0,7" fill="none" stroke="#8b949e" stroke-width="1.2"/></marker></defs><style>.r{font:600 11px var(--font-mono);letter-spacing:.04em}.t{font:400 13.5px var(--font-sans);fill:#c9d1d9}.n{font:400 11.5px var(--font-sans);fill:#8b949e}.sysr{fill:#8b949e}.humr{fill:#d29922}.selr{fill:#3fb950}.box{fill:#161b22;stroke:#262c36}.hbox{fill:#1c222b;stroke:#3a2f14}</style><text x="0" y="14" class="r" fill="#e6edf3">AS-IS</text><text x="62" y="14" class="n">판단 단계가 없고, 그 공백을 사람이 전수로 메운다</text><rect x="0" y="30" width="200" height="40" rx="6" class="box"/><text x="14" y="47" class="r selr">SELLER</text><text x="14" y="62" class="t">상품정보 변경</text><line x1="100" y1="70" x2="100" y2="86" stroke="#8b949e" stroke-width="1.2" marker-end="url(#a1)"/><rect x="0" y="90" width="200" height="40" rx="6" class="box"/><text x="14" y="107" class="r sysr">SYSTEM</text><text x="14" y="122" class="t">변경 내용 저장</text><line x1="100" y1="130" x2="100" y2="146" stroke="#8b949e" stroke-width="1.2" marker-end="url(#a1)"/><rect x="0" y="150" width="320" height="40" rx="6" fill="none" stroke="#6e4a1f" stroke-width="1.2" stroke-dasharray="5 4"/><text x="14" y="175" class="t" fill="#d29922">여기에 &#39;허용해도 되는가&#39; 판단이 없다</text><line x1="100" y1="190" x2="100" y2="206" stroke="#8b949e" stroke-width="1.2" marker-end="url(#a1)"/><rect x="0" y="210" width="200" height="40" rx="6" class="box"/><text x="14" y="227" class="r sysr">SYSTEM</text><text x="14" y="242" class="t">고객에게 즉시 노출</text><line x1="100" y1="250" x2="100" y2="266" stroke="#8b949e" stroke-width="1.2" marker-end="url(#a1)"/><rect x="0" y="270" width="380" height="140" rx="6" class="hbox"/><text x="14" y="291" class="r humr">HUMAN</text><text x="14" y="311" class="t">운영팀이 변경 전후 값을 전수 대조</text><text x="14" y="332" class="t">판단 3개 — 정합성 / 어뷰징 여부 / 조치 수위</text><text x="14" y="353" class="t">상품명 원복 · 판매중단 실행</text><text x="14" y="374" class="t">셀러 문의·클레임 응대</text><text x="14" y="396" class="n">변경 물량에 비례해 검수 인력이 필요하다</text><line x1="400" y1="270" x2="400" y2="410" stroke="#6e4a1f" stroke-width="1.5"/><line x1="400" y1="270" x2="392" y2="270" stroke="#6e4a1f" stroke-width="1.5"/><line x1="400" y1="410" x2="392" y2="410" stroke="#6e4a1f" stroke-width="1.5"/><text x="412" y="334" class="r" fill="#d29922">노출된</text><text x="412" y="350" class="r" fill="#d29922">다음에야</text><text x="412" y="366" class="r" fill="#d29922">일어난다</text></svg></div>

분해하고 나면 세 가지가 드러납니다.

첫째, 판단 세 개가 **전부 고객에게 노출된 뒤에** 일어납니다. 둘째, 그중 정형 필드 판단은 조건이 명확해서 Rule로 옮길 수 있습니다. 셋째, 상품명 판단만 비정형이라 사람이 전수로 붙어 있어야 했습니다.

즉 문제는 AI 기능이 없었던 게 아닙니다. 정합성을 판단하는 단계가 업무 흐름의 제 위치에 놓여 있지 않았고, 그 공백을 사람의 사후 전수 검수가 메우고 있었던 겁니다.

이게 MAP을 건너뛰면 안 되는 이유입니다. 분해하지 않으면 "검수를 AI로 자동화하자"로 끝납니다. 사람이 뒤에서 메우고 있던 그 공백은 그대로 둔 채로요.

## 다음 편 예고

이제 판단이 어디에 있는지 알게 됐습니다. 그중 어디에 AI를 붙일지 골라야 합니다. 다음 편에서는 "AI가 할 수 있는가"만 보면 안 되는 이유와, 두 축으로 고르는 방법을 다루겠습니다.

한 줄로 남깁니다. 분해의 목적은 판단이 어디에 있는지, 그리고 어떤 판단이 빠져 있는지를 찾는 것입니다.
