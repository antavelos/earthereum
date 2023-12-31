import { MouseEventHandler } from 'react';
import { Container, Navbar as BNavbar, Button, OverlayTrigger, Badge, Popover } from 'react-bootstrap'

type NavBarProps = {
  title: string;
  isAuthenticated: boolean;
  currentAccount: string | null;
  earthBalance: Number | null;
  onClickConnect: MouseEventHandler<HTMLButtonElement>;
  onClickDisConnect: MouseEventHandler<HTMLButtonElement>;
}

const Navbar: React.FunctionComponent<NavBarProps> = (props: NavBarProps) => {
  return (
    <BNavbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <BNavbar.Brand href="#">{props.title}</BNavbar.Brand>
        <BNavbar.Toggle />
        <BNavbar.Collapse className="justify-content-end">
          {props.isAuthenticated
            ? <>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={
                    <Popover>
                      <Popover.Body>
                        {props.currentAccount}
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <BNavbar.Text>
                    Connected as:
                    <Badge bg="secondary">{props.currentAccount.slice(0, 8) + '...'}</Badge>
                  </BNavbar.Text>
                </OverlayTrigger> |
                <BNavbar.Text>EARTH: {props.earthBalance?.toString()} </BNavbar.Text>
                <Button size='sm' variant="primary" onClick={props.onClickDisConnect}>Disconnect</Button>
              </>
            : <Button size='sm' variant="primary" onClick={props.onClickConnect}>Connect</Button>
          }
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
}

export default Navbar;