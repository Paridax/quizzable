POCKETPORT=8090

"/usr/bin/pm2" restart "quizzable" && echo "Restarting Service" || cd "/server/quizzable/frontend" && "/usr/bin/pm2" start npm --name "quizzable" -- start && echo "Starting Service"
"/server/quizzable/database/quizzable" serve || fuser -n tcp -k $POCKETPORT && "/server/quizzable/database/quizzable" serve
