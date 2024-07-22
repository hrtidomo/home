#!/bin/bash
# Carga diaria de envíos generados por G3. PASO 1
#["192.168.200.7", "admin","admin","xxp","temp","",""
cd /home/mrw/PRJ/URB/BATCH/APIHOMEAIRCONDITIONER
php APIHOMEAIRCONDITIONER.php 192.168.200.7 admin admin n temp xxf n
php  winsock.php


