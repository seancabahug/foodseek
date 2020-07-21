import requests
import random

request_amount = 100;

first_names = ["Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Ty", "Victor", "Walter"]
last_names = ["Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard", "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt", "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman", "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord", "McCormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig", "Ory", "Paiser", "Pak", "Pettigrew", "Quinn", "Quizoz", "Ramachandran", "Resnick", "Sagar", "Schickowski", "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg", "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl", "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco", "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente", "Van Zandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner", "Wakefield", "Weinstein", "Weiss", "Woo", "Yang", "Yates", "Yocum", "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi", "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell", "Davidson", "Davis", "DeLorenzo", "Dinkins", "Doran", "Dugelman", "Dugan", "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan", "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson", "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel", "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff", "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier", "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer", "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers", "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager", "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler"]

for i in range(request_amount):

    user_data = {
        "username": 'testuser' + str(i),
        "realName": f"{first_names[random.randrange(0, len(first_names))]} {last_names[random.randrange(0, len(last_names))]}",
        "password": 'password' + str(i),
        "email": f'testuser{str(i)}@email.com',
        "isFoodProvider": "true" if i % 2 else "false"
    }

    # Registering your moms weight :pogger:
    reg_req = requests.post('http://localhost:8080/api/users/register', data=user_data)
    
    login_data = {
        "username": user_data['username'],
        "password": user_data['password']
    }
    
    login_req = requests.post('http://localhost:8080/api/users/login', data=login_data)
    print(login_req.text)
    user_data['token'] = login_req.json()['token']

    headers = {
        "Authorization": "Bearer " + user_data['token']
    }
    
    location_data = {
        "description": "This is location " + str(i),
        "location" : {
            "latitude": random.randrange(31579, 47220) / 1000,
            "longitude": random.randrange(-119443, -82000) / 1000
        }
    }
    location_req = requests.post('http://localhost:8080/api/locations/create', json=location_data, headers=headers)
    print(str(i) + " | " + location_req.json()['message'])