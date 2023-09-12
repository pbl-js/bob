package main

import "fmt"

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
	siema := "siema"
	elo := siema
	siema = "dupeczka"
	fmt.Printf("siema: %v elo: %v \n", siema, elo)
}
