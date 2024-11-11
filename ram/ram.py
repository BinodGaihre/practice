import os
print ("my name is binod gaihre")
print ('I am studing data science and visualization in northwestern university')
for i in range(3):
    for j in range(i):
        print(f'{j}\t')
abp = os.path.dirname(__file__)
rlp = "analysis"
fp = os.path.join(abp,rlp)
txt_file = os.path.join(fp, "txt_file.txt")
with open(txt_file, 'w') as write_txt:
    write_txt.write (f'this is my code')
    
