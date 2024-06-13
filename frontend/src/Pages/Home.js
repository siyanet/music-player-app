import { Box, Flex, Heading, Text } from 'rebass';
import { StyledHeading, StyledHeading3 } from '../StyledComponents/StyledText';
import { StyledContainer } from '../StyledComponents/StyledContainer';
import { PrimaryButton } from '../StyledComponents/StyledButtons';
import { Table, TableBody, TableHead, TableHeader, TableRow ,TableCell} from '../StyledComponents/StyledTable';
function Home(){
    return(
     <StyledContainer>
                <Flex flexDirection={'row'}width = '100%'>      
            <Box width={1/4} >
                <Flex flexDirection={'column'} width={'100%'}  justifyContent={'space-between'}>
                    <Box >
                <StyledHeading> My</StyledHeading>
                <StyledHeading>Music</StyledHeading>
               
                <PrimaryButton backgroundColor="#006100" hoverColor="#059e08">
                    <StyledHeading3>Home</StyledHeading3>
                </PrimaryButton>
            <PrimaryButton backgroundColor="#006100" hoverColor="#059e08"> <StyledHeading3>Favourites</StyledHeading3></PrimaryButton>
            <PrimaryButton backgroundColor="#006100" hoverColor="#059e08"> <StyledHeading3>Upload</StyledHeading3></PrimaryButton> 
              
              </Box>
              <Box  ><PrimaryButton><StyledHeading>LogOut</StyledHeading></PrimaryButton></Box>
            </Flex>
        </Box>
        <Box width={3/4}>
            <Flex flexDirection={'column'} width={'100%'}>
                     
        <Flex flexDirection={'row'} justifyContent={'space-between'} width={'100%'}>
            <Box>search</Box>
        <StyledHeading>Hi</StyledHeading>
        </Flex>
        <Table>
            <TableHead>
             <TableHeader>play</TableHeader>
             <TableHeader>img</TableHeader>
             <TableHeader>title</TableHeader>
             <TableHeader>musican</TableHeader>
             <TableHeader>actions</TableHeader>
            </TableHead>
            <TableBody>
                <TableRow> 
                    <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                 </TableRow>
               
                <TableRow>
                <TableCell>okay </TableCell>
                <TableCell>okay </TableCell>
                <TableCell>okay </TableCell>
                <TableCell> okay</TableCell>
                <TableCell>okay </TableCell>
                </TableRow>
                
                
            </TableBody>
        </Table>

            </Flex>
      
        </Box>
       
        </Flex>
  
     </StyledContainer>
    

     
  
    );
}
export default Home;