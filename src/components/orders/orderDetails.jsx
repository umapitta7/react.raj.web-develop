import React from "react"
import PropTypes from "prop-types"

import useSkeletonGenerator from "../../customHooks/useSkeletonGenerator"

const OrderDetails = ({ style }) => {
  const Skeleton = useSkeletonGenerator({
    variant: "rect",
    animation: "wave",
    width: "724px",
    height: "66px",
  })

  return <div style={{ ...style }}>{Skeleton}</div>
}

export default OrderDetails

OrderDetails.propTypes = {
  // warehouse: PropTypes.shape({}).isRequired,
}

OrderDetails.defaultProps = {}
