from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from models import SearchResult, SearchResponse
import corpus_tools

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "http://127.0.0.1:4200",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

corpus_tools.load_corpus()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/search/")
async def perform_search(query: str):
    
    results = corpus_tools.search(query)

    return SearchResponse(
        query=query,
        results=results,
        total=len(results)
    )

handler = Mangum(app)