import { Container, Navbar as BNavbar, Button, OverlayTrigger, Badge, Popover } from 'react-bootstrap'
import { IWeb3Context, useWeb3Context } from '../context/Web3Context';
import { IContractContext, useContractContext } from '../context/ContractContext';

const Navbar: React.FunctionComponent = () => {
  const {state: {earthBalance, landBalance}} = useContractContext() as IContractContext;
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address },
  } = useWeb3Context() as IWeb3Context;

  return (
    <BNavbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <BNavbar.Brand href="#">Earthereum</BNavbar.Brand>
        <BNavbar.Toggle />
        <BNavbar.Collapse className="justify-content-end">
          {isAuthenticated
            ? <>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={
                    <Popover>
                      <Popover.Body>
                        {address}
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <BNavbar.Text>
                    Connected as:
                    <Badge bg="secondary">{address!.slice(0, 8) + '...'}</Badge>
                  </BNavbar.Text>
                </OverlayTrigger> |
                <BNavbar.Text>EARTH: {earthBalance?.toString()} </BNavbar.Text> |
                <BNavbar.Text>LAND: {landBalance?.toString()} </BNavbar.Text> |
                <Button size='sm' variant="primary" onClick={disconnect}>Disconnect</Button>
              </>
            : <Button size='sm' variant="primary" onClick={connectWallet}>Connect</Button>
          }
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
}

export default Navbar;