#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
import json
import ed25519
from binascii import hexlify, unhexlify
import hashlib
import struct
import time

#url = "http://127.0.0.1:9906"

#genesis_addr = '1632srrskscs1d809y3x5ttf50f0gabf86xjz2s6aetc9h9ewwhm58dj3'

#response = requests.get("%s/transctions/%s" % (url,genesis_addr))
#obj = json.loads(response.text)

'''
{
    "txid" : "08286278b1ba0b4c0a56b4fb049b8bcb7882ebb14aa3ca41085bfb0320476cbc",
    "sign_hash" : "1b22e893c087bbf6502cf0bcd46f1e81dfe51e50c75bdffffab8ce596be079e2",
    "version" : 1,
    "type" : "token",
    "time" : 1652076986,
    "nonce" : 15,
    "from" : "1231kgws0rhjtfewv57jegfe5bp4dncax60szxk8f4y546jsfkap3t5ws",
    "to" : "1231kgws0rhjtfewv57jegfe5bp4dncax60szxk8f4y546jsfkap3t5ws",
    "amount" : "1.0",
    "gaslimit" : 10000,
    "gasprice" : "0.00000000000001",
    "gasused" : 10000,
    "txfee" : "0.0000000001",
    "data" : "00",
    "sig" : "54a8beabf398c79e470d37e1c3caef592573eb741965518f5f37eea1ad5aaabc5604899d3a4fa8c01e407156147c1ca0926676488fc3a79781efc044d67e4501",
    "fork" : "000000007fd73a8a4dc7cb9e67dd9a8f61a09606514c4f9f7c8c7867a2a47944",
    "height" : 0,
    "blockhash" : ""
}
'''
addr = '1231kgws0rhjtfewv57jegfe5bp4dncax60szxk8f4y546jsfkap3t5ws'
importprivkey = '9ae89671cc1a74e9e404a16982ae48d21c56d4ad8278bc9755235a68fc841271'
tx_hash = '1b22e893c087bbf6502cf0bcd46f1e81dfe51e50c75bdffffab8ce596be079e2'
sk = ed25519.SigningKey(unhexlify(importprivkey)[::-1])
sign_data = sk.sign(unhexlify(tx_hash)[::-1])

ret = hexlify(sign_data).decode()
print(ret)