# MMM-Runways
Magic Mirror - Open runways off schiphol airport 

Info extracted from https://www.lvnl.nl/
# Installation
Navigate into your MagicMirror's `modules` folder and execute
 'git clone https://github.com/hansterwal/MMM-runways MMM-Runways'

Navigate into your MagicMirror's `vendor` folder and execute
'npm install --save @fortawesome/fontawesome-free' 

 Add the folowing line to the vendor.js '"font-awesome5.css": "node_modules/@fortawesome/fontawesome-free/css/all.min.css"'

# Using the module

Just display only

## Config options

No config options as of yet

## Example config.js content for this module
		{
			module: "MMM-Runways",
			position: "top_left",
      		header: "Schiphol runways"		
		},

The MIT License (MIT) 
===================== 
Copyright 2017 Hans ter Wal

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. **The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.** 

