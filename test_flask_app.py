import unittest
import json
import urllib.parse
from server import app

class TestFlaskApp(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()

    def tearDown(self):
        pass

    def test_put(self):
        # Test adding a key-value pair
        data = {'key': 'test_key', 'value': 'test_value'}
        response = self.client.post('/put', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'message', response.data)
        print("PUT test passed.")

    def test_get(self):
    # Test retrieving a value by key (using dictionary for query parameter)
        data = {'key': 'test_key'}  # Use dictionary for query parameter
        query_string = urllib.parse.urlencode(data)
        response = self.client.get('/get?' + query_string)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'value', response.data)
        print("GET test passed.")

    def test_get_all_keys(self):
        # Test retrieving all keys
        response = self.client.get('/getall')
        self.assertEqual(response.status_code, 200)
        keys = json.loads(response.data.decode('utf-8'))
        self.assertIsInstance(keys, list)
        print("GET all keys test passed.")

    def test_delete(self):
        # Test deleting a key-value pair
        response = self.client.delete('/delete?key=test_key')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'deleted', response.data)
        print("DELETE test passed.")

if __name__ == '__main__':
    unittest.main()
