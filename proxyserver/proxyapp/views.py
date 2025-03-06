from django.http import StreamingHttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests

@csrf_exempt
def proxy_request(request):
    """Acts as a forward proxy"""
    target_url = request.GET.get("url")  
    if not target_url:
        return JsonResponse({"error": "No URL provided"}, status=400)

    method = request.method  
    headers = {key: value for key, value in request.headers.items() if key.lower() != 'host'}
    data = request.body if method in ["POST", "PUT", "PATCH"] else None

    try:
        response = requests.request(method, target_url, headers=headers, data=data, stream=True, timeout=10)

        proxy_response = StreamingHttpResponse(response.iter_content(chunk_size=1024), status=response.status_code)
        for key, value in response.headers.items():
            proxy_response[key] = value  

        return proxy_response
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)
