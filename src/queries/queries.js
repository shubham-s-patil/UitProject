import gql from 'graphql-tag'

//get faculty ids query for listing ids
const getFacultiesQuery=gql`
    {
        faculties{
            id
        }
    }
`
const getFacultyQuery=gql`
    query($id:ID){
        faculty(id:$id){
            id
            first_name
            last_name
            email_address
            mobile_number
            domain_mappings{
                preference_num
                domain{
                  name
                }
            }
        }
    }
`
const getStudentQuery=gql`
    query($student_id:ID){
        student(gr_number:$student_id){
            gr_number
            first_name
            last_name
            email_address
            mobile_number
        }
    }
`
const getGallocResultsQuery=gql`
    query{
        student_group_domain_guide_mappings{
            id
            student_group_id
        }
    }
`
const getSingleGallocResultQuery=gql`
    query($id:ID){
        student_group_domain_guide_mapping(id:$id){
            id
            guide_id
            student_group_id
            allocated_domain{
                name
            }
            student_group{
                student_mappings{
                    student_id
                }
                domain_mappings{
                    preference_num
                    domain{
                        name
                    }
                }
            }
        }
    }
`
const addStudentMutation=gql`
    mutation($gr_number:String!,$email_address:String!,$first_name:String!,$last_name:String!,$mobile_num:String!){
        addStudent(gr_number:$gr_number,email_address:$email_address,first_name:$first_name,last_name:$last_name,mobile_number:$mobile_num){
            gr_number
            first_name
            last_name
            email_address
        }
    }

    
`
const addStudentGroupMutation=gql`
    mutation($gr_number:String!,$email_address:String!,$first_name:String!,$last_name:String!,$mobile_num:String!){
        addStudent(gr_number:$gr_number,email_address:$email_address,first_name:$first_name,last_name:$last_name,mobile_number:$mobile_num){
            gr_number
            first_name
            last_name
            email_address
        }
    }

    
`

export {addStudentMutation,addStudentGroupMutation,getFacultiesQuery,getFacultyQuery,getGallocResultsQuery,getSingleGallocResultQuery,getStudentQuery};