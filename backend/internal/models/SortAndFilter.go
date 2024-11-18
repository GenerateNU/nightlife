package models

import (
	"fmt"
	"strconv"
	"strings"
)

type SortAndFilter struct {
	filterMap  map[string]FilterBy 
}

func (s *SortAndFilter) Make() SortAndFilter {
	filterMap := map[string]FilterBy {
		"PriceLessThan" : &PriceLessThan{}, 
		"RatingGreaterThan" : &RatingGreaterThan{},
	}
	return SortAndFilter{filterMap: filterMap}
}

// assumes a non-empty list of filters, list of strings is case sensitive 
func (s *SortAndFilter) ConstructFilterQuery(filters []string) string {
	// based on list of strings for filters construct SQL WHERE queries to filter database based on certain parameters
	if len(filters) == 0 {
		return ``
	}

	query := `WHERE `
	for i := range filters {
		// map each given filter to its associated object
		filter := filters[i] // get filter 
		index := strings.Index(filter, " ") // check if the filter has parameters/get the index for the command
		command := filter
		if index != -1 { // if the filter command has a parameter
			command = filter[0:index]
			parameter := filter[index + 1:] // extract parameter for the filter 
			s.filterMap[command].Set(parameter) // set the parameter for the query
		}
		// get the string for that object and concate WHERE command to query string 
		query += s.filterMap[command].WhereQuery()
		if i + 1 < len(filters) {
			query += ` AND `
		}	 	
	}
	return query 
}

// assumes input is a non-empty string and one of the possible sort types, case sensitive 
func (s *SortAndFilter) SortVenues(input string) string {
	// parse given input string to get sort string value and possible parameters for the sort 
	index := strings.Index(input, " ")
	command := input
	if index != -1 { // if the sort has a parameter 
		command = input[0:index]
	}
	// create sort object and sort array of venues based on sort 
	createdSort := s.createSort(command, input, index) 
	return createdSort.SortQuery()
}

// takes in an array of venues to sort, command string determing what sort we want to create, input string storing that commands parameters, and index of the first space is applicable 
func (s *SortAndFilter) createSort(command string, input string, index int) SortBy {
	if command == "ByDistance" { // format: ByDistance long lat 
		// parse location to check distance from 
		lastIndex := strings.LastIndex(input, " ")
		long, err := strconv.ParseFloat(input[index + 1: lastIndex], 64)
		if err != nil {
			fmt.Println("Formatting error Long " + err.Error())
		}
		lat, err := strconv.ParseFloat(input[lastIndex + 1:], 64)
		if err != nil {
			fmt.Println("Formatting error Lat " + err.Error())
		}
		s := ByDistance{long, lat}
		return &s 
	} else {
		return &ByDistance{} // throw an error/return blank sort or something 
	}
}

// SORT TYPES

// NOTE: ALSO REORGANIZE FHEIWQHIO 

type SortBy interface {
	SortQuery() string 
}

type ByDistance struct {
	long float64
	lat float64
}

func (s *ByDistance) SortQuery() string {
	return fmt.Sprintf(`6371 * 2 * ASIN(SQRT(
		POWER(SIN((%f - latitude) * PI() / 180 / 2), 2) +
		COS(%f * PI() / 180) * COS(latitude * PI() / 180) *
		POWER(SIN((%f - longitude) * PI() / 180 / 2), 2)
	)) AS distance`, s.lat, s.lat, s.long)
}

// NOTE TO SELF - REORGANIZE PLZ 

// FILTER TYPES: 

type FilterBy interface {
	WhereQuery() string // return the WHERE command to be passed into the SQL query 
	Set(v string) // assigns parameter within struct for filter command 
}

type PriceLessThan struct {
	price string 
}

func (f *PriceLessThan) WhereQuery() string {
	return `price < ` + f.price
}

func (f *PriceLessThan) Set(price string) {
	f.price = price 
}

type RatingGreaterThan struct {
	rating string 
}

func (f *RatingGreaterThan) WhereQuery() string {
	return `total_rating > ` + f.rating  
}

func (f *RatingGreaterThan) Set(rating string) {
	f.rating = rating 
}