package main

import (
	"fmt"
	"net/http"
)

type ToDo struct {
	id    int
	title string
	done  bool
	order int
}

func GetToDoList() []ToDo {
	return []ToDo{
		{
			id:    1,
			title: "Super important task",
			done:  false,
			order: 1,
		},
	}
}

func AddToDo() []ToDo {
	return []ToDo{
		{
			id:    1,
			title: "Super important task",
			done:  false,
			order: 1,
		},
	}
}

func main() {
	mux := http.NewServeMux()
	mux.Handle("/", &homeHandler{})

	err := http.ListenAndServe(":8080", mux)

	if err == nil {
		fmt.Printf("Server running on port:8080")
	}
}

type homeHandler struct{}

func (h *homeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("This is my home page"))
}
