import logging
import sys
from vectordb import Memory
from models import SearchResult

import os

memory = Memory(chunking_strategy={'mode':'sliding_window', 'window_size':20, 'overlapp':8})
data_dir = "./data"
logger = logging.getLogger()
logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)

def load_corpus():
    logger.info(f"Loading corpus from {data_dir}")
    # load text into Memory
    for filename in os.listdir(data_dir):
        if filename.endswith('.txt'):
            with open(os.path.join(data_dir, filename), 'r', encoding='utf-8') as f:
                content = f.read()
                memory.save(content, [{"filename": filename}])
    logger.info("Corpus loading complete")

def search(query: str) -> list[SearchResult]:
    logger.info(f"Received search query: {query}")
    results = memory.search(query)
    logger.info(f"Search results: {results}")

    search_results = []
    for result in results:
        metadata = result['metadata']
        search_results.append(SearchResult(
            title=metadata.get('filename', 'Unknown'),
            excerpt=result['chunk'],
            location=metadata.get('filename', 'Unknown'),
            distance=result['distance']
        ))
    return search_results

if __name__ == "__main__":
    test_query = "mēkusvpkv"
    load_corpus()
    results = search(test_query)
    for result in results:
        print(f"Title: {result.title}")
        print(f"Excerpt: {result.excerpt}")
        print(f"Location: {result.location}")
        print(f"Distance: {result.distance}")
        print("-" * 40)