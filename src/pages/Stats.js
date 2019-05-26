import React, {useState, useEffect} from 'react';
import {ratingObjRef, uniRef, userRef} from './../Database';
import { Spinner } from 'react-bootstrap';
import { updateArrayBindingPattern } from 'typescript';
import { SSL_OP_NO_TLSv1_1 } from 'constants';

const Stats = (props) => {

    // To make it easier, these are going to be multiarray of universities array where:
    // [[UniversityID][Total rating][Sci rating][Bus rating][Hea rating][Hum rating][Med rating]]   // TOTALS -- CALCULATED AFTER
    // [[UniversityID][Total rating][Sci rating][Bus rating][Hea rating][Hum rating][Med rating]]   // COURSES  
    // [[UniversityID][Total rating][Sci rating][Bus rating][Hea rating][Hum rating][Med rating]]   // MAJORS
    // [[UniversityID][Total rating][Sci rating][Bus rating][Hea rating][Hum rating][Med rating]]   // UNITS

    // EACH RATING ARRAY IS AN OBJECT ------
    //      {
    //          ratingSum:          
    //          ratingCount: 
    //      } 
    // const [allStats, setAllStats] = useState();
    // const [sciStats, setSciStats] = useState();
    // const [busStats, setBusStats] = useState();
    // const [heaStats, setHeaStats] = useState();
    // const [humStats, setHumStats] = useState();
    // const [medStats, setMedStats] = useState();

    const uniRating = (id) => {
        return {
            id: id,
            total: ratingInfo(),
            courses: ratingInfo(),
            majors: ratingInfo(),
            units: ratingInfo(),
        }
    }

    const calcAvg = (ratingInfo) => {
        return ratingInfo.ratingSum / ratingInfo.ratingCount;
    }

    const setAvg = (statObj) => {
        return {
            id: statObj.id,
            totalAverage: calcAvg(statObj.total),
            courseAverage: calcAvg(statObj.courses),
            majorAverage: calcAvg(statObj.majors),
            unitAverage: calcAvg(statObj.units),
        }
    }

    const ratingInfo = () => {
        return {
            ratingSum: 0,
            ratingCount: 0,
        }

    }

    let stats = [];
    let averages = [];

    

    const [loading, setLoading] = useState(true);
    const [, Update] = useState();
    const [loadingNames, setLoadingNames] = useState(true);
    const [loadingUni, setLoadingUni] = useState(true);
    const [averagesExists, setAveragesExists] = useState(false);
    const [top3All, setTop3All] = useState(false);
    const [top3Courses, setTop3Courses] = useState(false);
    const [top3Majors, setTop3Majors] = useState(false);
    const [top3Units, setTop3Units] = useState(false);
    const [top3AllNames, setTop3AllNames] = useState(false);
    const [top3CoursesNames, setTop3CoursesNames] = useState(false);
    const [top3MajorsNames, setTop3MajorsNames] = useState(false);
    const [top3UnitsNames, setTop3UnitsNames] = useState(false);
    const [uniNames, ] = useState([]);

    useEffect(() => {
        if (loading) {

            if (loadingUni) {
                uniRef.once("value", (snap) => {
                    snap.forEach((child) => {
                        uniNames.push({id: child.key, name: child.val().name});;
                    })
                })
                setLoadingUni(false);
            }

            ratingObjRef.once("value", (snap) => {
                snap.forEach((child) => {
                    let v = child.val();
                    let uniExists = false;

                    // First entry
                    if (!stats.length) {
                        stats.push(uniRating(v.uni));
                    }

                    for (let i = 0; i < stats.length; i++) {
                        if (v.uni == stats[i].id) {
                            uniExists = true;
                            // Update
                            stats[i].total.ratingSum+=v.ratingSum;
                            stats[i].total.ratingCount+=v.ratings;

                            if (v.type == "Course") {
                                stats[i].courses.ratingSum+=v.ratingSum;
                                stats[i].courses.ratingCount+=v.ratings;
                            } else if (v.type == "Major") {
                                stats[i].majors.ratingSum+=v.ratingSum;
                                stats[i].majors.ratingCount+=v.ratings;
                            } else if (v.type == "Unit") {
                                stats[i].units.ratingSum+=v.ratingSum;
                                stats[i].units.ratingCount+=v.ratings;
                            }
                            averages[i] = setAvg(stats[i]);
                            setAveragesExists(true);
                        }
                    }

                    if (!uniExists) {
                        // Create
                        let i = stats.length;
                        stats.push(uniRating(v.uni));
                        // Update
                        stats[i].total.ratingSum+=v.ratingSum;
                        stats[i].total.ratingCount+=v.ratings;

                        if (v.type == "Course") {
                            stats[i].courses.ratingSum+=v.ratingSum;
                            stats[i].courses.ratingCount+=v.ratings;
                        } else if (v.type == "Major") {
                            stats[i].majors.ratingSum+=v.ratingSum;
                            stats[i].majors.ratingCount+=v.ratings;
                        } else if (v.type == "Unit") {
                            stats[i].units.ratingSum+=v.ratingSum;
                            stats[i].units.ratingCount+=v.ratings;
                        }
                        averages[i] = setAvg(stats[i]);
                        setAveragesExists(true);
                    }
                })

                if (averagesExists) {
                    // Calculate top 3 total
                    let first = {avg: -1, id: -1};
                    let second = {avg: -1, id: -1};
                    let third = {avg: -1, id: -1};
                    for (let i = 0; i < averages.length; i++) {
                        // Total average
                        if (averages[i].totalAverage > first.avg) {
                            third.avg = second.avg;
                            third.id = second.id;
                            second.avg = first.avg;
                            second.id = first.id;
                            first.avg = averages[i].totalAverage;
                            first.id = averages[i].id;
                        } else if (averages[i].totalAverage > second.avg) {
                            third.avg = second.avg;
                            third.id = second.id;
                            second.avg = averages[i].totalAverage;
                            second.id = averages[i].id;
                        } else if (averages[i].totalAverage > third.avg) {
                            third.avg = averages[i].totalAverage;
                            third.id = averages[i].id;
                        }
                        setTop3All({first: first, second: second, third: third,})
                    }

                    // Calculate top 3 courses
                    first = {avg: -1, id: -1};
                    second = {avg: -1, id: -1};
                    third = {avg: -1, id: -1};
                    for (let i = 0; i < averages.length; i++) {
                        // Total average
                        if (averages[i].courseAverage > first.avg) {
                            third.avg = second.avg;
                            third.id = second.id;
                            second.avg = first.avg;
                            second.id = first.id;
                            first.avg = averages[i].courseAverage;
                            first.id = averages[i].id;
                        } else if (averages[i].courseAverage > second.avg) {
                            third.avg = second.avg;
                            third.id = second.id;
                            second.avg = averages[i].courseAverage;
                            second.id = averages[i].id;
                        } else if (averages[i].courseAverage > third.avg) {
                            third.avg = averages[i].courseAverage;
                            third.id = averages[i].id;
                        }
                        setTop3Courses({first: first, second: second, third: third,})
                    }

                    // Calculate top 3 majors
                    first = {avg: -1, id: -1};
                    second = {avg: -1, id: -1};
                    third = {avg: -1, id: -1};
                    for (let i = 0; i < averages.length; i++) {
                        // Total average
                        if (averages[i].majorAverage > first.avg) {
                            third.avg = second.avg;
                            third.id = second.id;
                            second.avg = first.avg;
                            second.id = first.id;
                            first.avg = averages[i].majorAverage;
                            first.id = averages[i].id;
                        } else if (averages[i].majorAverage > second.avg) {
                            third.avg = second.avg;
                            third.id = second.id;
                            second.avg = averages[i].majorAverage;
                            second.id = averages[i].id;
                        } else if (averages[i].majorAverage > third.avg) {
                            third.avg = averages[i].majorAverage;
                            third.id = averages[i].id;
                        }
                        setTop3Majors({first: first, second: second, third: third,})
                    }

                    // Calculate top 3 units
                    first = {avg: -1, id: -1};
                    second = {avg: -1, id: -1};
                    third = {avg: -1, id: -1};
                    for (let i = 0; i < averages.length; i++) {
                        // Total average
                        if (averages[i].unitAverage > first.avg) {
                            third.avg = second.avg;
                            third.id = second.id;
                            second.avg = first.avg;
                            second.id = first.id;
                            first.avg = averages[i].unitAverage;
                            first.id = averages[i].id;
                        } else if (averages[i].unitAverage > second.avg) {
                            third.avg = second.avg;
                            third.id = second.id;
                            second.avg = averages[i].unitAverage;
                            second.id = averages[i].id;
                        } else if (averages[i].unitAverage > third.avg) {
                            third.avg = averages[i].unitAverage;
                            third.id = averages[i].id;
                        }
                        setTop3Units({first: first, second: second, third: third,})
                    }
                }



                if (averages.length) {

                    setLoading(false)
                }
            })
        }

        if (top3All && top3Courses && top3Units && top3Majors && loadingNames && !loadingUni) {
            // totals
            let first = undefined;
            let second = undefined;
            let third = undefined;
            first = getUniName(top3All.first, "1.");
            second = getUniName(top3All.second, "2.");
            third = getUniName(top3All.third, "3.");
                
            if (first !== undefined && second !== undefined && third !== undefined) {
                setTop3AllNames({first: first, second: second, third: third})
            }

            // courses
            first = undefined;
            second = undefined;
            third = undefined;
            first = getUniName(top3Courses.first, "1.");
            second = getUniName(top3Courses.second, "2.");
            third = getUniName(top3Courses.third, "3.");
                
            if (first !== undefined && second !== undefined && third !== undefined) {
                setTop3CoursesNames({first: first, second: second, third: third})
            }

            // majors
            first = undefined;
            second = undefined;
            third = undefined;
            first = getUniName(top3Majors.first, "1.");
            second = getUniName(top3Majors.second, "2.");
            third = getUniName(top3Majors.third, "3.");
                
            if (first !== undefined && second !== undefined && third !== undefined) {
                setTop3MajorsNames({first: first, second: second, third: third})
            }

            // units
            first = undefined;
            second = undefined;
            third = undefined;
            first = getUniName(top3Units.first, "1.");
            second = getUniName(top3Units.second, "2.");
            third = getUniName(top3Units.third, "3.");
                
            if (first !== undefined && second !== undefined && third !== undefined) {
                setTop3UnitsNames({first: first, second: second, third: third})
                setLoadingNames(false);
            }
        }
      
    }, [loading, Update, loadingNames, top3Units, top3UnitsNames, top3All, top3Courses, top3Majors, top3CoursesNames, top3MajorsNames, top3AllNames, averagesExists])


    const getUniName = (obj, number) => {
        for (let i = 0; i < uniNames.length; i++) {
            if (obj.id == uniNames[i].id) {
                return (
                    <div className="background-background stat-hover w-100 py-3 mt-3 border" style={{height: "auto"}}>
                        <div className="h3 vertical-align mt-2 px-3 float-left h-100">
                            {number}
                        </div>
                        <div className="px-3">
                            <div className="primary-color h6">
                                <b>{uniNames[i].name}</b>                            
                            </div>
                            <div>
                                Average rating:  
                                <b className="ml-2">{Math.round(obj.avg * 100)/100}</b>
                            </div>
                        </div>
                   </div>
                ); 
            } 
        }
        return (
            <div className="background-background w-100 mt-3 py-3 border" style={{height: "auto"}}>
                <div className="h3 vertical-align px-3 float-left h-100">
                    {number}
                </div>
                <div className="px-3 mt-2">
                    <div className="primary-color h6">
                        No data found
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        )

    }

    console.log(top3AllNames)

    if(top3AllNames !== false) {
        return  (
            <div>
            {
                <div>
                    <div className="w-100 p-2 border px-3 text-background background-primary"><a href="/">Forum</a> > <a href={"/stats"}>Stats</a></div>
                    <div className="w-100 background-light-background p-3 border-left border-right border-bottom">
                    <div className="row">
                        <div className="col-md mb-4">
                            <h5 className="mt-1">Top Universities (All ratings)</h5>
                            <div>
                                {
                                    top3All.first.id !== -1
                                    ? (
                                        <a onClick={() => {
                                            localStorage.setItem("selectedUniversity", top3All.first.id);
                                            if (props.user) {
                                                userRef.child(props.user.uid).update({'selectedUni': top3All.first.id});
                                            }
                                            window.location.href = "/";
                                        }}>{top3AllNames.first}</a>
                                    ) : (
                                        <div>
                                            {top3AllNames.first}
                                       </div>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    top3All.second.id !== -1
                                    ? (
                                        <a onClick={() => {
                                            localStorage.setItem("selectedUniversity", top3All.second.id);
                                            if (props.user) {
                                                userRef.child(props.user.uid).update({'selectedUni': top3All.first.id});
                                            }
                                            window.location.href = "/";
                                        }}>{top3AllNames.second}</a>
                                    ) : (
                                        <div>
                                            {top3AllNames.second}
                                       </div>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    top3All.third.id !== -1
                                    ? (
                                        <a onClick={() => {
                                            localStorage.setItem("selectedUniversity", top3All.third.id);
                                            if (props.user) {
                                                userRef.child(props.user.uid).update({'selectedUni': top3All.first.id});
                                            }
                                            window.location.href = "/";
                                        }}>{top3AllNames.third}</a>
                                    ) : (
                                        <div>
                                            {top3AllNames.third}
                                       </div>
                                    )
                                }
                            </div>
                        </div> 
                        <div className="col-md mb-4">
                            <h5 className="mt-1">Top Universities (Course Ratings)</h5>
                            <div>
                                {
                                    top3Courses.first.id !== -1
                                    ? (
                                        <a onClick={() => {
                                            localStorage.setItem("selectedUniversity", top3Courses.first.id);
                                            if (props.user) {
                                                userRef.child(props.user.uid).update({'selectedUni': top3All.first.id});
                                            }
                                            window.location.href = "/course-reviews";
                                        }}>{top3CoursesNames.first}</a>
                                    ) : (
                                        <div>
                                            {top3CoursesNames.first}
                                       </div>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    top3Courses.second.id !== -1
                                    ? (
                                        <a onClick={() => {
                                            localStorage.setItem("selectedUniversity", top3Courses.second.id);
                                            if (props.user) {
                                                userRef.child(props.user.uid).update({'selectedUni': top3All.first.id});
                                            }
                                            window.location.href = "/course-reviews";
                                        }}>{top3CoursesNames.second}</a>
                                    ) : (
                                        <div>
                                            {top3CoursesNames.second}
                                       </div>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    top3Courses.third.id !== -1
                                    ? (
                                        <a onClick={() => {
                                            localStorage.setItem("selectedUniversity", top3Courses.third.id);
                                            if (props.user) {
                                                userRef.child(props.user.uid).update({'selectedUni': top3All.first.id});
                                            }
                                            window.location.href = "/course-reviews";
                                        }}>{top3CoursesNames.third}</a>
                                    ) : (
                                        <div>
                                            {top3CoursesNames.third}
                                       </div>
                                    )
                                }
                            </div>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-md mb-4">
                            <h5 className="mt-3">Top Universities (Major Ratings)</h5>
                            <div>
                                {
                                    top3Majors.first.id !== -1
                                    ? (
                                        <a onClick={() => {
                                            localStorage.setItem("selectedUniversity", top3Majors.first.id);
                                            if (props.user) {
                                                userRef.child(props.user.uid).update({'selectedUni': top3All.first.id});
                                            }
                                            window.location.href = "/major-reviews";
                                        }}>{top3MajorsNames.first}</a>
                                    ) : (
                                        <div>
                                            {top3MajorsNames.first}
                                       </div>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    top3Majors.second.id !== -1
                                    ? (
                                        <a onClick={() => {
                                            localStorage.setItem("selectedUniversity", top3Majors.second.id);
                                            if (props.user) {
                                                userRef.child(props.user.uid).update({'selectedUni': top3All.first.id});
                                            }
                                            window.location.href = "/major-reviews";
                                        }}>{top3MajorsNames.second}</a>
                                    ) : (
                                        <div>
                                            {top3MajorsNames.second}
                                       </div>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    top3Majors.third.id !== -1
                                    ? (
                                        <a onClick={() => {
                                            localStorage.setItem("selectedUniversity", top3Majors.third.id);
                                            if (props.user) {
                                                userRef.child(props.user.uid).update({'selectedUni': top3All.first.id});
                                            }
                                            window.location.href = "/major-reviews";
                                        }}>{top3MajorsNames.third}</a>
                                    ) : (
                                        <div>
                                            {top3MajorsNames.third}
                                       </div>
                                    )
                                }
                            </div>
                        </div> 
                        <div className="col-md mb-4">
                            <h5 className="mt-3">Top Universities (Unit Ratings)</h5>
                            <div>
                                {
                                    top3Units.first.id !== -1
                                    ? (
                                        <a onClick={() => {
                                            localStorage.setItem("selectedUniversity", top3Units.first.id);
                                            if (props.user) {
                                                userRef.child(props.user.uid).update({'selectedUni': top3All.first.id});
                                            }
                                            window.location.href = "/unit-reviews";
                                        }}>{top3UnitsNames.first}</a>
                                    ) : (
                                        <div>
                                            {top3UnitsNames.first}
                                       </div>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    top3Units.second.id !== -1
                                    ? (
                                        <a onClick={() => {
                                            localStorage.setItem("selectedUniversity", top3Units.second.id);
                                            if (props.user) {
                                                userRef.child(props.user.uid).update({'selectedUni': top3All.first.id});
                                            }
                                            window.location.href = "/unit-reviews";
                                        }}>{top3UnitsNames.second}</a>
                                    ) : (
                                        <div>
                                            {top3UnitsNames.second}
                                       </div>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    top3Units.third.id !== -1
                                    ? (
                                        <a onClick={() => {
                                            localStorage.setItem("selectedUniversity", top3Units.third.id);
                                            if (props.user) {
                                                userRef.child(props.user.uid).update({'selectedUni': top3All.first.id});
                                            }
                                            window.location.href = "/unit-reviews";
                                        }}>{top3UnitsNames.third}</a>
                                    ) : (
                                        <div>
                                            {top3UnitsNames.third}
                                       </div>
                                    )
                                }
                            </div>
                        </div> 
                    </div>
                        {/* <div className="row">
                            <div className="col-md">
                                <h5>All</h5>
                                <h5>Science, Engineering & Information Technology</h5>
                                <h5>Business, Economics & Law</h5>
                            </div>
                            <div className="col-md">
                                <h5>Health & Behavioural Science</h5>
                                <h5>Humanities & Social Sciences</h5>
                                <h5>Medicine</h5>
                            </div>
                        </div> */}
                    </div>
                    
                    {/* <div>
                    {
                        props.selectedUni
                        ? (
                            <div>
                            </div>
                        ) : (
                            <div>
                                <a href="/select"><div className="mt-5 text-center">To view statistics on courses, majors and units - please select a university</div></a>
                            </div>
                        )
                    }
                    </div> */}
                    
                </div>
            }
            </div>
        )
    } else {
        return <Spinner className="spinner" />
    }
}

export default Stats; 