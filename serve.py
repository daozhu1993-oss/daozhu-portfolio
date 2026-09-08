import http.server
import socketserver
import os
import sys

PORT = 7890
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def guess_type(self, path):
        if path.endswith('.js'):
            return 'application/javascript; charset=utf-8'
        if path.endswith('.css'):
            return 'text/css; charset=utf-8'
        if path.endswith('.svg'):
            return 'image/svg+xml'
        return super().guess_type(path)

class ThreadingV4Server(socketserver.ThreadingMixIn, http.server.HTTPServer):
    address_family = http.server.socket.AF_INET
    daemon_threads = True

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    server_address = ('0.0.0.0', port)
    httpd = ThreadingV4Server(server_address, CustomHandler)
    print(f"🚀 岛主全新个人站本地预览已启动: http://localhost:{port} (PID: {os.getpid()})")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
