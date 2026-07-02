import MysteryBox from './MysteryBox.jsx'

// Lays out the 4 mystery boxes and derives each box's visual state from the
// current game phase. Pure presentation — all decisions come from props.
export default function BoxGrid({
  boxes,
  openedIndices,
  phase,
  chosenIndex,
  slotPosition,
  maxOpens,
  onOpen,
  onChoose,
}) {
  const opensExhausted = openedIndices.length >= maxOpens

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {boxes.map((box, i) => {
        let state = 'closed'
        if (phase === 'revealing') state = 'revealed'
        else if (openedIndices.includes(i)) state = 'opened'

        return (
          <MysteryBox
            key={`${slotPosition}-${i}-${box.player.id}`}
            box={box}
            index={i}
            state={state}
            slotPosition={slotPosition}
            canOpen={!opensExhausted}
            chosen={phase === 'revealing' && i === chosenIndex}
            onOpen={() => onOpen(i)}
            onChoose={() => onChoose(i)}
          />
        )
      })}
    </div>
  )
}
