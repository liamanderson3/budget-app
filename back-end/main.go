package main

import (
	"io/ioutil"
	// "io"
	// "os"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"
)

type Entry struct {
	Name   string `json:"name"`
	Amount int    `json:"amount"`
	State  bool
}

var entries = make([]Entry, 0)
var port = ":8100"

func main() {
	http.HandleFunc("/", EntryHandler)

	log.Println("Starting server...")

	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err)
	}
}

/*
	comment
*/
func EntryHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.Error(w, "404 Not Found.", http.StatusNotFound)
		return
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	switch r.Method {
	case "GET":
		http.ServeContent(w, r, "foo.txt", time.Now(), strings.NewReader(string(RetrieveEntries())))
		//return list of items
	case "POST":
		RetrievePost(w, r)
		log.Println()
		http.ServeContent(w, r, "", time.Now(), strings.NewReader("yes"))
		//add new item
	}
}

func RetrievePost(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}

	var dat map[string]interface{}
	if err := json.Unmarshal(body, &dat); err != nil {
		log.Fatal(err)
	}
	if dat["type"].(string) == "add" {
		AddEntry(dat["name"].(string), dat["amount"].(string))
	} else if dat["type"].(string) == "remove" {
		RemoveEntry(dat["name"].(string))
	}
}

func AddEntry(name string, amount string) {
	amountInt, _ := strconv.Atoi(amount)
	e := Entry{name, amountInt, false}
	entries = append(entries, e)
}

func RemoveEntry(name string) {
	i := FindEntry(name)
	entries = remove(entries, i)
}

func SetState(name string, state bool) {
	i := FindEntry(name)
	entries[i].State = state
}

func FindEntry(name string) int {
	for p, v := range entries {
		if v.Name == name {
			return p
		}
	}
	return -1
}

func RetrieveEntries() []byte {
	jsonData, err := json.Marshal(entries)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(jsonData)
	return jsonData
}

func remove(slice []Entry, ind int) []Entry {
	slice[len(slice)-1], slice[ind] = slice[ind], slice[len(slice)-1]
	return slice[:len(slice)-1]
}
