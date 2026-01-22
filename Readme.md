to swtich to AWS use 

ssh -i "test key.pem" ec2-user@13.60.217.126
pm2 start "npx next start -H 0.0.0.0 -p 3000" --name invoice-app
pm2 save
pm2 list
http://13.60.217.126:3000
pm2 logs invoice-app --lines 50


*********
