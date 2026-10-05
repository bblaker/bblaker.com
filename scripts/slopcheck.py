#!/usr/bin/env python3
"""
Measure the writing tells that make a draft read as machine-written.

    python3 scripts/slopcheck.py content/posts/*.mdx

None of this is a rule. It's a diff against my own published voice, which sits
around: 30-60 contractions per 1k words, one rule-of-three per post, zero
meta-commentary, mean sentence 12-15 words, 23-38% of sentences under nine
words. A draft well outside that band usually reads wrong before I can say why.
"""
import re, sys, statistics as st
from collections import Counter

def body(p):
    s = open(p).read()
    s = s.split('---', 2)[2]
    s = re.sub(r'```.*?```', ' ', s, flags=re.S)      # code blocks
    s = re.sub(r'<[^>]+>', ' ', s)                     # components
    s = re.sub(r'^#.*$', '', s, flags=re.M)            # headings
    s = re.sub(r'^>.*$', '', s, flags=re.M)            # blockquotes
    return re.sub(r'\s+', ' ', s).strip()

def sentences(t):
    return [x.strip() for x in re.split(r'(?<=[.!?])\s+', t) if len(x.split()) > 1]

for path in sys.argv[1:]:
    t = body(path); sents = sentences(t)
    L = [len(s.split()) for s in sents]
    print(f"\n=== {path.split('/')[-1]} ===")
    print(f"  {len(sents)} sentences · mean {st.mean(L):.1f}w · stdev {st.pstdev(L):.1f}  (burstiness)")
    print(f"  short (<9w): {sum(1 for x in L if x<9)} ({sum(1 for x in L if x<9)/len(L)*100:.0f}%)"
          f"   long (>32w): {sum(1 for x in L if x>32)} ({sum(1 for x in L if x>32)/len(L)*100:.0f}%)")

    op = Counter(' '.join(s.split()[:2]).lower().strip('.,') for s in sents)
    rep = [f"{k}×{v}" for k,v in op.most_common(6) if v>1]
    print(f"  repeated openers : {', '.join(rep) if rep else 'none'}")

    tri = re.findall(r'\b[\w\'`]+(?:\s+[\w\'`]+){0,3},\s+[\w\'`]+(?:\s+[\w\'`]+){0,3},\s+(?:and|or)\s+[\w\'`]+', t)
    print(f"  rule-of-three    : {len(tri)}")
    for x in tri[:6]: print(f"      · {x[:72]}")

    anti = re.findall(r'(?:is|are|was|were|It is|That is)\s+not\s+[^.]{3,60}?[.,]\s*(?:It is|They are|it is|they are|but)\b', t)
    anti += re.findall(r'\bnot\s+(?:a|an|the)?\s*[\w\s]{2,30}?\.\s+It is\b', t)
    print(f"  'not X / it is Y': {len(anti)}")

    meta = re.findall(r'\b(I want to be precise|I should be honest|I want to (?:be clear|note)|to be clear|Here is the|It is worth|worth noting|I think it generalis\w+)\b', t, re.I)
    print(f"  meta-commentary  : {len(meta)} {[m for m in meta[:5]]}")

    words = re.findall(r"[a-z']{4,}", t.lower())

    common = [f"{w}×{c}" for w,c in Counter(words).most_common(40) if c >= 5 and w not in
              {'that','this','with','have','from','they','their','them','when','what','which','there','been','were','your','into','than','because','about'}][:8]
    print(f"  repeated words   : {', '.join(common)}")

    raw = open(path).read().split('---', 2)[2]
    contr = len(re.findall(r"\b\w+'(?:s|t|re|ve|ll|d|m)\b", raw))
    print(f"  contractions     : {contr/len(raw.split())*1000:.1f} per 1k words  (mine: 30-60)")
    print(f"  em dashes        : {raw.count(chr(8212))}")
