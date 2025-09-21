import re
from urllib.parse import urlparse

# Fake/untrusted domains (expand later)
BLACKLISTED_DOMAINS = [
    "fake-news.com", "unreliablesource.org", "clickbait.net"
]

CLICKBAIT_PATTERNS = [
    r"SHOCKING", r"BREAKING", r"YOU WON’T BELIEVE", r"CLICK HERE",
    r"!!!", r"100% FREE"
]

def domain_trust(domain: str) -> int:
    """Check domain reputation. Returns penalty score (0-100)."""
    if not domain:
        return 0
    if domain.lower() in BLACKLISTED_DOMAINS:
        return -50
    if domain.endswith((".blogspot.com", ".wordpress.com")):
        return -10
    return 0

def text_spam_features(text: str) -> int:
    """Check spammy signals in text (caps, clickbait, emojis)."""
    score = 0
    if len(re.findall(r"[A-Z]{5,}", text)) > 2:  # excessive ALL CAPS
        score -= 10
    if any(re.search(pattern, text, re.IGNORECASE) for pattern in CLICKBAIT_PATTERNS):
        score -= 15
    if len(re.findall(r"[😀-🙏]", text)) > 5:  # too many emojis
        score -= 10
    return score

def evaluate_credibility(structured_input: dict) -> dict:
    """
    Runs credibility heuristics and outputs a trust score (0-100).
    """
    text = structured_input.get("cleaned_text", "")
    metadata = structured_input.get("metadata", {})
    domain = metadata.get("domain", "")

    base_score = 70  # start optimistic

    # Apply heuristics
    base_score += domain_trust(domain)
    base_score += text_spam_features(text)

    # Clamp score between 0–100
    final_score = max(0, min(100, base_score))

    return {
        "score": final_score,
        "domain_checked": domain,
        "flags": {
            "spammy_text": text_spam_features(text) < 0,
            "untrusted_domain": domain.lower() in BLACKLISTED_DOMAINS
        }
    }
