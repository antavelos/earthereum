import { Container, Navbar as BNavbar } from 'react-bootstrap'

const Navbar: React.FunctionComponent<{ title: string, signedAddress: string }> = ({ title, signedAddress }) => {
    return (
      <BNavbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <BNavbar.Brand href="#">{title}</BNavbar.Brand>
          <BNavbar.Toggle />
          <BNavbar.Collapse className="justify-content-end">
            <BNavbar.Text>
              Signed in as: <a href="">{signedAddress}</a>
            </BNavbar.Text>
          </BNavbar.Collapse>
        </Container>
      </BNavbar>
    );
  }

  export default Navbar;