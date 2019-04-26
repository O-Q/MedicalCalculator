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

func main() {
	router := mux.NewRouter()
	fs := http.FileServer(http.Dir("static"))
	router.HandleFunc("/api/hash/{filename}", GetHash).Methods("GET")
	router.PathPrefix("/api/static/").Handler(http.StripPrefix("/api/static/", fs)).Methods("GET")
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "OPTIONS"})
	srv := &http.Server{
		Handler:      handlers.CORS(originsOk, headersOk, methodsOk)(router),
		Addr:         ":8443",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	log.Fatal(srv.ListenAndServe())

	//log.Fatal(srv.ListenAndServeTLS(":8443","","",nil))
}
func GetHash(writer http.ResponseWriter, request *http.Request) {
	params := mux.Vars(request)
	hash := utils.GetMd5Hash(params["filename"])
	utils.PanicIf(json.NewEncoder(writer).Encode(hash))
}



