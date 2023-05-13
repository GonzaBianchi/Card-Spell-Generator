import pandas as pd
import csv


ruta_archivo = "dndspells.xlsx"  # Reemplaza con la ruta y nombre de tu archivo Excel

datos = pd.read_excel(ruta_archivo)

spells = set()
with open('spells_to_print.txt', 'r') as f:
	s = f.read().split("\n");
	for x in s:
		spells.add(x)

print(len(spells))

b = False
l = []
with open('spells_imprimir.csv', 'w') as f:
	for n in spells:
		n = n.strip()
		row = list(datos[datos["Name"] == n].values)[0]
		
		row = [str(r) if not pd.isna(r) else "" for r in row]
		
		#print(row)		

	
		# lvl;name;type;cast time;range;ataque;duration;description
		#Level	Name	School	Casting Time	Range	Attack	Duration	Details
		row_csv = str(row[0])+";"+row[1]+";"+row[2]+";"
		row_csv += row[3]+";"+row[4]+";"+row[5]+";"
		row_csv += row[6]+";"
		row_csv += row[7]
		
		#print("s========================")
		#print(type(row_csv))
		row_csv = row_csv.replace("—", "-")
		row_csv = row_csv.replace("\n \n", "<br>")
		row_csv = row_csv.replace("\n", "<br>")
		row_csv = row_csv.replace("’", "'")
		row_csv = row_csv.replace("<br> <br>", "<br>")
		row_csv = row_csv.replace("<br><br>", "<br>")
		
		l.append(row[0]+" "+row[1])
		#print(repr(row_csv))

		# write a row to the csv file
		if b:
			f.write("\n"+row_csv)
		else:
			f.write(row_csv)
		b = True

l = sorted(l)
for i in l:
	print(i)