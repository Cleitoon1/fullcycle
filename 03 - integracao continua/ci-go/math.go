package main

import "fmt"

func main() {
	fmt.Println("Resultado da soma")
	fmt.Println(soma(112, 10))
}

func soma(a int, b int) int {
	return a + b
}
