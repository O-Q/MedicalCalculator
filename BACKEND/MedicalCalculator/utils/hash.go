package utils

import (
  "crypto/md5"
  "encoding/hex"
  "io/ioutil"
)
const StaticFileDirectory = "./../static/"
func GetMd5Hash(filename string) Hash{
  hasher := md5.New()
  s, err := ioutil.ReadFile(StaticFileDirectory + filename)

  if err != nil{
    return Hash{Name:filename, Hash:""}
  }
  hasher.Write(s)
  return Hash{Name:filename,Hash:hex.EncodeToString(hasher.Sum(nil))}
}

type Hash struct {
  Name, Hash string
}
