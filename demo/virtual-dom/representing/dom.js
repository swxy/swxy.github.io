/**
 * Created by swxy on 2017/4/7.
 */

/** 示例dom结构
 {
     "tagName": "ul",
     "props": {
         "class": "list"
     },
     "children": [{
         "tagName": "li",
         "props": {},
         "children": ["item 1"]
     }, {
         "tagName": "li",
         "props": {},
         "children": ["item 2"]
     }]
 };
 */

/**
 * 工具函数，用于表示dom节点,
 *
 h('ul', {'class': 'list'}, [
    h('li', {}, ['item 1']),
    h('li', {}, ['item 2'])
 ])
 * @param {string} tagName 标签名称
 * @param {Object} props 标签的属性
 * @param {Array} children 子节点
 * @return {{tagName: *, props: *, children: *}} 返回dom
 */
function h(tagName, props, ...children) {
    return {tagName, props, children};
}


function createElement(node) {
    if (typeof node === "string") {
        return document.createTextNode(node);
    }
    let $el = document.createElement(node.tagName);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}


function updateElement($parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
        $parent.appendChild(createElement(newNode));
    }
    else if (!newNode) {
        $parent.removeChild($parent.childNodes[index]);
    }
    else if (changed(newNode, oldNode)) {
        $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    }
    else if (newNode.tagName) {
        const newNodeLength = newNode.children.length;
        const oldNodeLength = oldNode.children.length;
        for (let i = 0; i < newNodeLength || i < oldNodeLength; i++) {
            updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
        }
    }
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2
        || typeof node1 === 'string' && node1 !== node2
        || node1.tagName !== node2.tagName;
}