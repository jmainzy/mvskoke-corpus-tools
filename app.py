from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/search/")
async def search(token: str):
    return {"message": f"Search results for token: {token}"}

handler = Mangum(app)