import React from "react"
import PropTypes from "prop-types"

import useSkeletonGenerator from "../../customHooks/useSkeletonGenerator"

const Delivered = ({ style }) => {
  const Skeleton = useSkeletonGenerator({
    variant: "rect",
    animation: "wave",
    width: "724px",
    height: "128px",
  })

  return <div style={{ ...style }}>{Skeleton}</div>
}

export default Delivered

Delivered.propTypes = {
  // warehouse: PropTypes.shape({}).isRequired,
}

Delivered.defaultProps = {}
