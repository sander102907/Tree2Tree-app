import requests
import os
from difflib import unified_diff

input = """5
10 4
13 9
100 13
123 456
92 46
"""

expected_output = """2
5
4
333
0"""

program = """int main()
{
	int n;
	cin>>n;
	for(int i=0;i<n;i++){
		int a,b;
		cin>>a>>b;
		if(a%b!=0)
			cout<<b-a%b<<endl;
		else
			cout<<0<<endl;
	}
}
"""

BASE_URL = os.environ['BASE_URL']

binary_name = requests.post(f'{BASE_URL}api/programs', json={'program': program}).json()['binary']
output = requests.post(f'{BASE_URL}api/programs/{binary_name}/run', json={'input': input}).json()['stdout']
requests.delete(f'{BASE_URL}api/programs/{binary_name}')

for d in unified_diff(expected_output.strip(), output.strip()):
    print(d)