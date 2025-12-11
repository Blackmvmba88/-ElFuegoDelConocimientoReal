import { render, screen, fireEvent } from '@testing-library/react';
import ChamberCard from '@/components/ChamberCard';
import { Chamber } from '@/types';

describe('ChamberCard Component', () => {
  const unlockedChamber: Chamber = {
    id: 'chamber-1',
    grade: 1,
    name: 'Cámara del Silencio',
    element: 'Silencio',
    description: 'En el silencio encontramos las primeras verdades',
    unlocked: true,
  };

  const lockedChamber: Chamber = {
    id: 'chamber-2',
    grade: 5,
    name: 'Cámara del Fuego',
    element: 'Fuego',
    description: 'El fuego transmuta y purifica',
    unlocked: false,
    requiredVibration: 75,
  };

  it('renders chamber name and description', () => {
    render(<ChamberCard chamber={unlockedChamber} />);
    
    expect(screen.getByText('Cámara del Silencio')).toBeInTheDocument();
    expect(screen.getByText('En el silencio encontramos las primeras verdades')).toBeInTheDocument();
  });

  it('renders chamber grade', () => {
    render(<ChamberCard chamber={unlockedChamber} />);
    
    expect(screen.getByText('Grado 1')).toBeInTheDocument();
  });

  it('renders chamber element', () => {
    render(<ChamberCard chamber={unlockedChamber} />);
    
    expect(screen.getByText('Silencio')).toBeInTheDocument();
  });

  it('shows lock icon for locked chambers', () => {
    const { container } = render(<ChamberCard chamber={lockedChamber} />);
    
    const lockIcon = container.querySelector('svg');
    expect(lockIcon).toBeInTheDocument();
  });

  it('does not show lock icon for unlocked chambers', () => {
    const { container } = render(<ChamberCard chamber={unlockedChamber} />);
    
    const lockIcon = container.querySelector('.absolute.top-2.right-2');
    expect(lockIcon).not.toBeInTheDocument();
  });

  it('shows required vibration for locked chambers', () => {
    render(<ChamberCard chamber={lockedChamber} />);
    
    expect(screen.getByText(/Vibración requerida: 75%/i)).toBeInTheDocument();
  });

  it('does not show required vibration for unlocked chambers', () => {
    render(<ChamberCard chamber={unlockedChamber} />);
    
    expect(screen.queryByText(/Vibración requerida/i)).not.toBeInTheDocument();
  });

  it('calls onClick callback when unlocked chamber is clicked', () => {
    const onClickMock = jest.fn();
    render(<ChamberCard chamber={unlockedChamber} onClick={onClickMock} />);
    
    const card = screen.getByText('Cámara del Silencio').closest('div');
    if (card) {
      fireEvent.click(card);
    }
    
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick callback when locked chamber is clicked', () => {
    const onClickMock = jest.fn();
    render(<ChamberCard chamber={lockedChamber} onClick={onClickMock} />);
    
    const card = screen.getByText('Cámara del Fuego').closest('div');
    if (card) {
      fireEvent.click(card);
    }
    
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('applies correct styling for unlocked chambers', () => {
    const { container } = render(<ChamberCard chamber={unlockedChamber} />);
    
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('cursor-pointer');
    expect(card.className).not.toContain('opacity-50');
  });

  it('applies correct styling for locked chambers', () => {
    const { container } = render(<ChamberCard chamber={lockedChamber} />);
    
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('opacity-50');
    expect(card.className).toContain('cursor-not-allowed');
  });
});
