import re
import requests
from bs4 import BeautifulSoup

def is_url(text: str) -> bool:
    """Check if input is a URL."""
    return text.startswith("http://") or text.startswith("https://")

def clean_text(text: str) -> str:
    """Remove extra spaces, emojis, and unwanted characters."""
    text = re.sub(r'\s+', ' ', text)  # multiple spaces → single
    text = re.sub(r'[^\x00-\x7F]+', '', text)  # remove non-ASCII (like emojis)
    return text.strip()

def fetch_from_url(url: str) -> dict:
    """Fetch and extract main content from a webpage."""
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        # Get metadata
        title = soup.title.string if soup.title else ""
        meta_desc = soup.find("meta", attrs={"name": "description"})
        description = meta_desc["content"] if meta_desc else ""

        # Extract paragraphs
        paragraphs = " ".join([p.get_text() for p in soup.find_all("p")])

        return {
            "type": "url",
            "raw_input": url,
            "cleaned_text": clean_text(paragraphs[:2000]),  # limit to 2000 chars
            "metadata": {
                "title": title,
                "description": description,
                "domain": requests.utils.urlparse(url).netloc
            }
        }
    except Exception as e:
        return {"error": f"Failed to fetch URL: {str(e)}"}

def process_input(user_input: str) -> dict:
    """Main function called by FastAPI route."""
    if is_url(user_input):
        return fetch_from_url(user_input)
    else:
        return {
            "type": "text",
            "raw_input": user_input,
            "cleaned_text": clean_text(user_input),
            "metadata": {}
        }
