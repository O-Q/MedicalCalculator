package main

import (
	"MedicalCalculator/utils"
	"encoding/json"
	"github.com/gorilla/handlers"
  "github.com/gorilla/mux"
  "log"
	"net/http"
	"time"
)

const CertFile = "/etc/letsencrypt/live/miakova.ddns.net/fullchain.pem"
const KeyFile = "/etc/letsencrypt/live/miakova.ddns.net/privkey.pem"
func main() {
	router := mux.NewRouter()
	fs := http.FileServer(http.Dir("./../static"))
	router.HandleFunc("/api/hash/{filename}", GetHash).Methods("GET")
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
	log.Fatal(srv.ListenAndServeTLS(CertFile, KeyFile))
}
func GetHash(writer http.ResponseWriter, request *http.Request) {
	params := mux.Vars(request)
	hash := utils.GetMd5Hash(params["filename"])
	utils.PanicIf(json.NewEncoder(writer).Encode(hash))
}
