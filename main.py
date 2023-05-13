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

l = []
s = []
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
		s.append(row_csv)
		#print(repr(row_csv))

		# write a row to the csv file
	b = False
	l = sorted(l)
	s = sorted(s)
	for i in s:
		if b:
			f.write("\n"+i)
		else:
			f.write(i)
		b = True
	for i in l:
		print(i)