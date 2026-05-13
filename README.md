## Mvskoke Corpus Search
For searching text, audio, and more.  Work in progress.

### Requirements

Install python and conda.  
Install requirements, i.e.:  
`conda install --file requirements.txt`

## Deploy the App

Development:  
`fastapi dev` 

Deployment:  
`uvicorn app:app --host 0.0.0.0 --port ${PORT:-8000}`