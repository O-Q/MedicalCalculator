package utils

import (
	"crypto/md5"
	"encoding/hex"
	"io/ioutil"
	"log"
)

func GetMd5Hash(filename string) string{
	hasher := md5.New()
	s, err := ioutil.ReadFile("static/" + filename + ".json")
	hasher.Write(s)
	if err != nil {
		log.Fatal(err)
	}
	return hex.EncodeToString(hasher.Sum(nil))
}
