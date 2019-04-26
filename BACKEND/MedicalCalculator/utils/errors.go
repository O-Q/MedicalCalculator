package utils

func PanicIf(e error) {
	if e != nil {
		panic(e)
	}
}
