python -m pip list --format=freeze > requirements.txt
uvicorn app:app --reload