import styled from '@emotion/styled'

const ViewSwitcherWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`

const ViewButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? '#4CAF50' : '#e0e0e0')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#45a049' : '#d0d0d0')};
  }
`

function ViewSwitcher({ viewMode, setViewMode }) {
  return (
    <ViewSwitcherWrapper>
      {['day', 'week', 'month'].map((mode) => (
        <ViewButton
          key={mode}
          active={viewMode === mode}
          onClick={() => setViewMode(mode)}
        >
          {mode === 'day'
            ? 'Widok dzienny'
            : mode === 'week'
              ? 'Widok tygodniowy'
              : 'Widok miesięczny'}
        </ViewButton>
      ))}
    </ViewSwitcherWrapper>
  )
}

export default ViewSwitcher
