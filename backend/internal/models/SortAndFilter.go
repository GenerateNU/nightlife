package models

import (
	"fmt"
	"math"
	"sort"
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
func (s *SortAndFilter) SortVenues(venues []Venue, input string) {
	// parse given input string to get sort string value and possible parameters for the sort 
	fmt.Println(input)
	index := strings.Index(input, " ")
	command := input
	if index != -1 { // if the sort has a parameter 
		command = input[0:index]
	}
	// create sort object and sort array of venues based on sort 
	createdSort := s.createSort(venues, command, input, index)
	sort.Sort(createdSort) 
}

// takes in an array of venues to sort, command string determing what sort we want to create, input string storing that commands parameters, and index of the first space is applicable 
func (s *SortAndFilter) createSort(venues []Venue, command string, input string, index int) sort.Interface {
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
		s := VenueSortByDistance{venues, long, lat}
		return &s 
	} else {
		return &VenueSortByDistance{} // throw an error/return blank sort or something 
	}
}

// SORT TYPES

// NOTE: ALSO REORGANIZE FHEIWQHIO 

type VenueSortByDistance struct{
	venues []Venue
	long float64
	lat float64 
}

func (s *VenueSortByDistance) Len() int {
	return len(s.venues) 
}

func (s *VenueSortByDistance) Less(i, j int) bool {
	v := s.venues 
    dOne := s.distanceBetweenPoints(v[i], s.long, s.lat)
	dTwo := s.distanceBetweenPoints(v[j], s.long, s.lat)
	return dOne < dTwo 
}

func (s *VenueSortByDistance) Swap(i, j int) {
	v := s.venues
    v[i], v[j] = v[j], v[i]
}

func (s * VenueSortByDistance) distanceBetweenPoints(v Venue, long float64, lat float64) float64 {
	r := 6371.0 // in KM 
	long1 := v.Longitude
	lat1 := v.Latitude
	changeInLong := (long1 - long) / 2
	changeInLat := (lat1 - lat) / 2
	sin2Lat := math.Pow(changeInLat, 2)
	sin2Long := math.Pow(changeInLong, 2)
	sqrtSol := math.Sqrt(sin2Lat + math.Cos(lat1) * math.Cos(lat) * sin2Long)
	return (2 * r) * math.Asin(sqrtSol)  
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