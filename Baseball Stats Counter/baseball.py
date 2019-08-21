import re
import sys, os

if len(sys.argv) < 2:
    sys.exit("Usage: "+ sys.argv[0]+ " filename")

filename = sys.argv[1]

if not os.path.exists(filename):
    sys.exit("Error: File " + sys.argv[1] + " is not found")

theRegex = re.compile("([A-Z][A-Za-z]+ [A-Z][A-Za-z]+).*(\d).*(\d).*(\d)")

names = [] # an empty list
bats_dict = {} # an empty dictionary
hits_dict = {}
with open(filename) as f:
    for line in f: 
        res = theRegex.match(line)
        if res is not None:
            name = res.group(1)
            bat = res.group(2)
            hit = res.group(3)
            a = True
            for player in names:
                if player == name:
                    bats_dict[name] += int(bat)
                    hits_dict[name] += int(hit)
                    a = False
            if a:
                names.append(name)
                bats_dict[name] = int(bat)
                hits_dict[name] = int(hit)
    print(names)
    # result is ['Jimmy Brown', 'Stu Martin', 'Enos Slaughter', 'Johnny Mize', 'Don Padgett', 'Pepper Martin', 'Terry Moore', 'Marty Marion', 'Mickey Owen', 'Mort Cooper', 'Lon Warneke', 'Hal Epps', 'Bill McGee', 'Johnny Hopp', 'Don Gutteridge', 'Joe Medwick', 'Eddie Lake', 'Max Lanier', 'Joe Orengo', 'Bill DeLancey', 'Bob Bowman', 'Ernie Koy', 'Clyde Shoun', 'Carl Doyle', 'Harry Walker', 'Walker Cooper', 'Carden Gillenwater', 'Creepy Crespi']
    print ("////////////////")
    print(bats_dict) # name is the key, bat_num is the value
    print ("///////////////////")
    # result is {'Jimmy Brown': 454, 'Stu Martin': 369, 'Enos Slaughter': 517, 'Johnny Mize': 579, 'Don Padgett': 240, 'Pepper Martin': 228, 'Terry Moore': 537, 'Marty Marion': 434, 'Mickey Owen': 306, 'Mort Cooper': 83, 'Lon Warneke': 86, 'Hal Epps': 14, 'Bill McGee': 73, 'Johnny Hopp': 149, 'Don Gutteridge': 105, 'Joe Medwick': 158, 'Eddie Lake': 63, 'Max Lanier': 28, 'Joe Orengo': 412, 'Bill DeLancey': 16, 'Bob Bowman': 30, 'Ernie Koy': 348, 'Clyde Shoun': 55, 'Carl Doyle': 23, 'Harry Walker': 27, 'Walker Cooper': 19, 'Carden Gillenwater': 23, 'Creepy Crespi': 11}
    print(hits_dict) # name is the key, hits_num is the value
    # result is {'Jimmy Brown': 127, 'Stu Martin': 88, 'Enos Slaughter': 158, 'Johnny Mize': 182, 'Don Padgett': 58, 'Pepper Martin': 72, 'Terry Moore': 163, 'Marty Marion': 121, 'Mickey Owen': 81, 'Mort Cooper': 13, 'Lon Warneke': 18, 'Hal Epps': 3, 'Bill McGee': 13, 'Johnny Hopp': 41, 'Don Gutteridge': 29, 'Joe Medwick': 48, 'Eddie Lake': 14, 'Max Lanier': 5, 'Joe Orengo': 118, 'Bill DeLancey': 4, 'Bob Bowman': 2, 'Ernie Koy': 108, 'Clyde Shoun': 8, 'Carl Doyle': 4, 'Harry Walker': 5, 'Walker Cooper': 6, 'Carden Gillenwater': 3, 'Creepy Crespi': 3}
    print ("///////////////////")

    average= {} # an empty dictionary
    # name is the key, average is the value

    for name in names:
        average[name] = round(float(hits_dict[name]) / float(bats_dict[name]),3)
    print(average)
    # result is {'Jimmy Brown': 0.28, 'Stu Martin': 0.238, 'Enos Slaughter': 0.306, 'Johnny Mize': 0.314, 'Don Padgett': 0.242, 'Pepper Martin': 0.316, 'Terry Moore': 0.304, 'Marty Marion': 0.279, 'Mickey Owen': 0.265, 'Mort Cooper': 0.157, 'Lon Warneke': 0.209, 'Hal Epps': 0.214, 'Bill McGee': 0.178, 'Johnny Hopp': 0.275, 'Don Gutteridge': 0.276, 'Joe Medwick': 0.304, 'Eddie Lake': 0.222, 'Max Lanier': 0.179, 'Joe Orengo': 0.286, 'Bill DeLancey': 0.25, 'Bob Bowman': 0.067, 'Ernie Koy': 0.31, 'Clyde Shoun': 0.145, 'Carl Doyle': 0.174, 'Harry Walker': 0.185, 'Walker Cooper': 0.316, 'Carden Gillenwater': 0.13, 'Creepy Crespi': 0.273}
    print ("///////////////////")

    sortedPlayers = sorted(average, key=lambda name: average[name], reverse = True)
    print (sortedPlayers)
    # result is ['Pepper Martin', 'Walker Cooper', 'Johnny Mize', 'Ernie Koy', 'Enos Slaughter', 'Terry Moore', 'Joe Medwick', 'Joe Orengo', 'Jimmy Brown', 'Marty Marion', 'Don Gutteridge', 'Johnny Hopp', 'Creepy Crespi', 'Mickey Owen', 'Bill DeLancey', 'Don Padgett', 'Stu Martin', 'Eddie Lake', 'Hal Epps', 'Lon Warneke', 'Harry Walker', 'Max Lanier', 'Bill McGee', 'Carl Doyle', 'Mort Cooper', 'Clyde Shoun', 'Carden Gillenwater', 'Bob Bowman']
    print ("/////////////")
    for player in sortedPlayers:
        print(player + ": %.3f" % average[player]) #%.3f is the number of decimal place left
#Pepper Martin: 0.316
# Walker Cooper: 0.316
# Johnny Mize: 0.314
# Ernie Koy: 0.310
# Enos Slaughter: 0.306
# Terry Moore: 0.304
# Joe Medwick: 0.304
# Joe Orengo: 0.286
# Jimmy Brown: 0.280
# Marty Marion: 0.279
# Don Gutteridge: 0.276
# Johnny Hopp: 0.275
# Creepy Crespi: 0.273
# Mickey Owen: 0.265
# Bill DeLancey: 0.250
# Don Padgett: 0.242
# Stu Martin: 0.238
# Eddie Lake: 0.222
# Hal Epps: 0.214
# Lon Warneke: 0.209
# Harry Walker: 0.185
# Max Lanier: 0.179
# Bill McGee: 0.178
# Carl Doyle: 0.174
# Mort Cooper: 0.157
# Clyde Shoun: 0.145
# Carden Gillenwater: 0.130
# Bob Bowman: 0.067