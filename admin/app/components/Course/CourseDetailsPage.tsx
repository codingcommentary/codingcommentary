import React, { useState } from 'react'
import Loader from "../Loader/Loader";
import { useGetCourseDetailsQuery } from "../../../redux/features/courses/coursesApi";
import Heading from '../../utils/Heading';
import CourseDetails from '../../components/Course/CourseDetails'


type Props = {
    id: string;

}

const CourseDetailsPage = ({ id }: Props) => {
    console.log(id)
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetCourseDetailsQuery(id);
    return (
        <> 
            {isLoading ? (
                <Loader />
            ): (
                <div>
                <Heading
                title={data.course.name + "- Eduvoyage"}
                description={
                    "Eduvoyage is an elearning platform"
                }
                keywords={data?.course?.tags}
                />
            <CourseDetails data={data.course} setRoute={setRoute}/>
            </div>
            )}
            </>
        );
    };
            export default CourseDetailsPage