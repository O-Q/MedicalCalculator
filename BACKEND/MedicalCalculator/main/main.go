package main

import (
  "MedicalCalculator/utils"
  "encoding/json"
  "github.com/gorilla/handlers"
  "github.com/gorilla/mux"
  "io/ioutil"
  "log"
  "net/http"
  "time"
)

const certFile = "/etc/letsencrypt/live/miakova.ddns.net/fullchain.pem"
const keyFile = "/etc/letsencrypt/live/miakova.ddns.net/privkey.pem"
const StaticFileDirectory  = "./../static/"

func main() {
  router := mux.NewRouter()
  fs := http.FileServer(http.Dir(StaticFileDirectory))
  router.HandleFunc("/api/hash/files", getHashes).Methods("GET")
  router.PathPrefix("/api/static/").Handler(http.StripPrefix("/api/static/", fs)).Methods("GET")
  headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
  // ORIGIN WARNING
  originsOk := handlers.AllowedOrigins([]string{"*"})
  methodsOk := handlers.AllowedMethods([]string{"GET", "OPTIONS"})
  srv := &http.Server{
  	Handler:      handlers.CORS(originsOk, headersOk, methodsOk)(router),
  	Addr:         "miakova.ddns.net:8443",
  	WriteTimeout: 15 * time.Second,
  	ReadTimeout:  15 * time.Second,
  }
  log.Fatal(srv.ListenAndServeTLS(certFile, keyFile))
}

func getHashes(writer http.ResponseWriter, request *http.Request) {
  files, err := ioutil.ReadDir(StaticFileDirectory)
  if err != nil {
    utils.PanicIf(err)
  }
  hashes := make([]utils.Hash, 0)
  for _, f := range files {
    hashes = append(hashes, utils.GetMd5Hash(f.Name()))
  }
  utils.PanicIf(json.NewEncoder(writer).Encode(hashes))
}
