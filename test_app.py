import unittest
from server import app


class TestServer(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """:arg
        this runs once at the start of test
        """
        cls.tester = app.test_client(cls)

    @classmethod
    def tearDownClass(cls):
        """:arg
                this runs once after all test is completed
        """
        print('teardownClass')

    def setUp(self):
        """:arg
                this runs before each test
        """
        pass

    def tearDown(self):
        """:arg
        this runs after each test
        """
        pass

    def test_index(self):
        response = self.tester.get('/')
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_about(self):
        response = self.tester.get('/about')
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_compare(self):
        response = self.tester.get('/compare')
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_app_api(self):
        response = self.tester.get('/app-api')
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_api(self):
        response = self.tester.post('/api', json={'no_of_requests':500, 'cache_sizes': [4, 5], 'zipf': 1.2, 'no_of_contents': 30})
        self.assertEqual(type(response.json).__name__, "dict")


if __name__ == '__main__':
    unittest.main()

