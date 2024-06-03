package main


import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
)

type Item struct{
	ID string `json:id`
	Name string `json:name`
	Price float64 `json:price`
}
var (
	items=[]Item{}
	itemMux sync.Mutex
)
func main()  {
	router := mux.NewRouter()
	router.HandleFunc("/api/items",getItems).Methods("GET")
	router.HandleFunc("/api/items",createItems).Methods("POST")
	router.HandleFunc("/api/items/{id}",updateItem).Methods("PUT")
	router.HandleFunc("/api/items/{id}",deleteItem).Methods("DELETE")

	headers:=handlers.AllowedHeaders([]string{"X-Request-With","Content-Type","Authorization"})
	methods := handlers.AllowedMethods([]string{"GET","POST","PUT","DELETE","OPTIONS	"})
	origins:= handlers.AllowedOrigins([]string{"*"})
	fmt.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080",handlers.CORS(headers,methods,origins)(router)))


	
}

func getItems(w http.ResponseWriter,r *http.Request){
	w.Header().Set("Content-Type","application/json")
	itemMux.Lock()
	defer itemMux.Unlock()
	json.NewEncoder	(w).Encode(items)
}

func createItems(w http.ResponseWriter,r *http.Request){
	var item Item
	json.NewDecoder(r.Body).Decode(&item)
	defer itemMux.Unlock()
    items=append(items,item)
	w.Header().Set("Content-Type","application/json")
	json.NewEncoder(w).Encode(item)

}

