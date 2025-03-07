from django.http import StreamingHttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# List of hop-by-hop headers that should not be forwarded
HOP_BY_HOP_HEADERS = {
    'connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization',
    'te', 'trailers', 'transfer-encoding', 'upgrade', 'content-encoding',
    'content-length'
}

@csrf_exempt
def proxy_request(request, path=''):
    """
    Acts as a forward proxy with path forwarding capability
    """
    # Get the target URL from the query parameter
    target_url = request.GET.get("url")
    
    if not target_url:
        return JsonResponse({"error": "No URL provided"}, status=400)
    
    # Construct the full URL if path is provided
    if path:
        if not target_url.endswith('/'):
            target_url += '/'
        url = f"{target_url}{path}"
    else:
        url = target_url
    
    # Log the request
    logger.info(f"Proxying {request.method} request to: {url}")
    
    # Forward all headers except 'host' and hop-by-hop headers
    headers = {key: value for key, value in request.headers.items() 
               if key.lower() not in ['host'] and key.lower() not in HOP_BY_HOP_HEADERS}
    
    # Get request body for appropriate methods
    data = request.body if request.method in ["POST", "PUT", "PATCH"] else None
    
    try:
        # Make the request to the target URL
        response = requests.request(
            method=request.method,
            url=url,
            headers=headers,
            params={k: v for k, v in request.GET.items() if k != 'url'},
            data=data,
            cookies=request.COOKIES,
            stream=True,
            timeout=30
        )
        
        # Create a streaming response
        proxy_response = StreamingHttpResponse(
            response.iter_content(chunk_size=4096),
            status=response.status_code,
            content_type=response.headers.get('Content-Type', 'text/html')
        )
        
        # Copy headers from the proxied response, excluding hop-by-hop headers
        for key, value in response.headers.items():
            if key.lower() not in HOP_BY_HOP_HEADERS:
                proxy_response[key] = value
        
        logger.info(f"Proxy response status: {response.status_code}")
        return proxy_response
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Error proxying request: {str(e)}")
        return JsonResponse({"error": str(e)}, status=500)
    
@csrf_exempt
def test(request):
    return JsonResponse({"message": "Hello, World!"})   

