package utils

import (
  "crypto/md5"
  "encoding/hex"
  "io/ioutil"
)

func GetMd5Hash(filename string) string{
	hasher := md5.New()
	s, err := ioutil.ReadFile("./../static/" + filename + ".json")
	PanicIf(err)
	hasher.Write(s)
	return hex.EncodeToString(hasher.Sum(nil))
}
